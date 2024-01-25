import anime from './node_modules/animejs/lib/anime.es.js';


window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 40000;

let {h, render, Component,} = preact; // import {h, render, Component,} from 'preact';

/** @jsx h */

// Generic swap function.
const swap = async (items, indexA, indexB, options) => {
  const swapValue = items[indexA];
  items[indexA] = items[indexB];
  items[indexB] = swapValue;

  if (options.delay) {
    await sleep(options.delay);
  }

  return {indexA, indexB};
};

// Shameless stackoverflow copy-paste.
const sleep = (ms) => {
  return (new Promise(resolve => setTimeout(resolve, ms)));
};

const watchableSwap = async function (items, indexA, indexB, options) {
  options.callbacks.swapStart(items, indexA, indexB);
  await swap(items, indexA, indexB, options)
    .then((data) => {
      options.callbacks.swapDone(items, indexA, indexB);

      return data;
    })
  ;
}

const QuickSortStrategy = (function () {
  const partition = async function (items, startIndex, stopIndex, options) {
    let pivotValue = items[stopIndex];
    let pivotIndex = startIndex;
    
    for (let i = startIndex; i < stopIndex; ++i) {
      if (items[i] < pivotValue) {
        await watchableSwap(items, i, pivotIndex, options)
        ++pivotIndex;
      }
    }
  
    await watchableSwap(items, pivotIndex, stopIndex, options);
    return pivotIndex;
  };
  
  const execute = async function (items, startIndex, stopIndex, options) {
    if (startIndex >= stopIndex) {
      return items;
    }

    var pivotIndex = await partition(items, startIndex, stopIndex, options);

    await Promise.all([
      profileAwareExecute(items, startIndex, pivotIndex - 1, options),
      profileAwareExecute(items, pivotIndex, stopIndex, options),
    ]);
    
    return items;
  }
  
  const profileAwareExecute = function (items, startIndex, stopIndex, options) {
    options.callbacks.partitionStart(items, startIndex, stopIndex);
    const promise = (new Promise((resolve) => {
      const data = execute(items, startIndex, stopIndex, options);
      
      resolve(data);
    }).then((data) => {
      options.callbacks.partitionDone(items, startIndex, stopIndex);

      return data;
    }));
    
    return promise;
  }
  
  function QuickSortStrategy(items, options) {
    if (!(this instanceof QuickSortStrategy)) { 
      throw new TypeError('Cannot call a class as a function');
    }
    
    this.items = items;
    this.startIndex = 0;
    this.stopIndex = items.length - 1;
    this.options = options;
  }
  
  Object.defineProperty(QuickSortStrategy.prototype, 'execute', {
    value: async function () {
      const promise = profileAwareExecute(this.items, this.startIndex, this.stopIndex, this.options)
      
      if (this.options.callbacks.done) {
        promise.then((data) => {
          this.options.callbacks.done(data);
        });
      }
    },
  });
  Object.defineProperty(QuickSortStrategy.prototype, 'getItems', {
    value: function () {
      return this.items;
    },
  });
  
  return QuickSortStrategy;
})();

const HeapSortStrategy = (function () {
  const findParent = (index) => {
    return Math.floor((index - 1) / 2);
  };
  
  const findLeftChild = (index) => {
    return (2 * index) + 1;
  };
  
  const findRightChild = (index) => {
    return findLeftChild(index) + 1;
  };
  
  const buildMaxHeap = async function (items, heapSize, options) {
    for (let index = findParent(heapSize); 0 <= index; --index) {
       await siftDown(items, index, heapSize, options);
    }
    
    return items;
  };
  
  const siftDown = async function (items, start, end, options) {
    let largest = start;
    while (largest < end) {
      let leftIndex = findLeftChild(largest);
      let rightIndex = findRightChild(largest);
      let swapIndex = largest;
      
      if (leftIndex < end && items[swapIndex] < items[leftIndex]) {
        swapIndex = leftIndex;
      }
      
      if (rightIndex < end && items[swapIndex] < items[rightIndex]) {
        swapIndex = leftIndex + 1;
      }
      
      if (swapIndex === largest) {
        // Root is the largest element.
        return;
      }

      await watchableSwap(items, swapIndex, largest, options);
      largest = swapIndex;
    }
    
    return items;
  };
  
  const execute = async function (items, options) {
    const heapSize = items.length;
    
    // Build the heap.
    await buildMaxHeap(items, heapSize, options);

    for (let i = heapSize - 1; 0 <= i; --i) {
      await watchableSwap(items, 0, i, options);

      await profileAwareSiftDown(items, 0, i, options);
    }

    return items;
  };
  
  const profileAwareSiftDown = function (items, start, end, options) {
    options.callbacks.partitionStart(items, start, end);
    const promise = (new Promise((resolve) => {
      const data = siftDown(items, start, end, options);
      
      resolve(data);
    }).then((data) => {
      options.callbacks.partitionDone(items, start, end);

      return data;
    }));
    
    return promise;
  }
  
  function HeapSortStrategy(items, options) {
    if (!(this instanceof HeapSortStrategy)) { 
      throw new TypeError('Cannot call a class as a function');
    }
    
    this.items = items;
    this.options = options;
  }
  
  Object.defineProperty(HeapSortStrategy.prototype, 'execute', {
    value: async function () {
      const promise = execute(this.items, this.options)
      
      if (this.options.callbacks.done) {
        promise.then((data) => {
          this.options.callbacks.done(data);
        });
      }
      
      return promise;
    },
  });
  
  return HeapSortStrategy;
})();

class App extends Component
{
  constructor(props)
  {
    super(props);
    
    this.algorithms = ['QUICK_SORT', 'HEAP_SORT'];
    const meta = [];
    for (let index = 0; index < this.props.length; ++index) {
      meta.push({
        ref: preact.createRef(),
      });
    }
    this.state = {
      delay: 50,
      items: [],
      meta: meta,
      runsCount: 0,
    };
  }
  
  setup()
  {
    const items = [];
    for (let index = 0; index < this.props.length; ++index) {
      var value = -1;
      do {
        value = anime.random(1, this.props.length);
      } while (-1 !== items.indexOf(value));
      items.push(value);
    }
    
    // Define sort strategy options.
    const options = {
      callbacks: {
        swapStart:      this.onSwapStart.bind(this),
        swapDone:       this.onSwapDone.bind(this),
        partitionStart: this.onPartitionStart.bind(this),
        partitionDone:  this.onPartitionDone.bind(this),
        done:           this.onSortingDone.bind(this),
      },
      delay: this.state.delay,
    };
    
    // Define the algorithm;
    let algorithm = this.algorithms[this.state.runsCount % this.algorithms.length];
    let strategy;
    switch (algorithm) {
      case 'QUICK_SORT':
        strategy = new QuickSortStrategy([...items], options);
        
        break;
      case 'HEAP_SORT':
        options.callbacks.partitionDone = (items, lowerBoundary, higherBoundary) => {
          const meta = this.state.meta;
          meta[higherBoundary] = Object.assign(meta[higherBoundary] || {}, {partition: false});

          this.setState({
            meta: meta,
          });
        };
        strategy = new HeapSortStrategy([...items], options);
        
        break;
      default:
        return;
    }
    
    this.setState({
      strategy: strategy,
      items: [...items],
    }, () => {
      this.resetView();
      
      this.runSort();
    });
  }
  
  componentDidMount()
  {
    this.setup();
  }
  
  componentDidUpdate()
  {
    this.drawY();
  }
  
  runSort()
  {
    setTimeout(() => {
      this.state.strategy.execute();
    }, 2000);
  }
  
  drawY()
  {
    const items = this.state.items;
    anime({
      duration: 500,
      easing: 'easeOutQuint',
      scaleY: (el, index, length) => {
        return (items[index] / length);
      },
      /*targets: this.state.meta.map((element) => {
        return element.ref.current;
      }),*/
      targets: '.viz-item-inner',
    });
  }
  
  resetView()
  {
    // Anime does not have any methods for resetting style;
    ['.viz-item', '.viz-item-dot', '.viz-item-indicator'].map((selector) => {
       const itemElements = document.querySelectorAll(selector);
      for (let i = 0; i < itemElements.length; ++i) {
        itemElements[i].style.backgroundColor = null;
      }
    });
  }
  
  onSortingDone(items)
  {
    const duration = 275;
    Promise.all([
      anime({
        delay: anime.stagger(10),
        backgroundColor: ['#000000', 'rgba(68, 255, 210, 0.25)', '#000000'],
        duration: duration,
        targets: '.viz-item',
      }),
      anime({
        backgroundColor: '#44FFD2',
        delay: anime.stagger(10),
        duration: duration,
        targets: '.viz-item-dot',
      }),
      anime({
        delay: anime.stagger(10),
        backgroundColor: '#44FFD2',
        duration: duration,
        targets: '.viz-item-indicator',
      }),
    ]).then(() => {
      this.setState({
        runsCount: this.state.runsCount + 1,
      })
      
      setTimeout(this.setup.bind(this), 2500);
    });
  }
  
  onPartitionStart(items, lowerBoundary, higherBoundary)
  {
    this.handleColors(items, lowerBoundary, higherBoundary, {partition: true});
  }
  
  onPartitionDone(items, lowerBoundary, higherBoundary)
  {
    this.handleColors(items, lowerBoundary, higherBoundary, {partition: false});
  }
  
  onSwapStart(items, currentIndex, pivotIndex)
  {
    this.handleColors2(items, currentIndex, pivotIndex, {active: true});
    
    /*anime({
      duration: 500,
      easing: 'easeOutQuint',
      scaleY: (el, index, length) => {
        return (items[currentIndex] / items.length);
      },
      targets: this.state.meta[currentIndex].ref.current,
    });
    anime({
      duration: 500,
      easing: 'easeOutQuint',
      scaleY: (el, index, length) => {
        return (items[pivotIndex] / items.length);
      },
      targets: this.state.meta[pivotIndex].ref.current,
    });*/
  }
  
  onSwapDone(items, currentIndex, pivotIndex)
  {
    this.handleColors2(items, currentIndex, pivotIndex, {active: false});
  }
  
  handleColors(items, lowerBoundary, higherBoundary, current)
  {
    const meta = this.state.meta || [];
    for (var i = lowerBoundary; i <= higherBoundary; ++i) {
      meta[i] = Object.assign(this.state.meta[i] || {}, current);
    }

    this.setState({
      meta: meta,
    });
  }
  
  handleColors2(items, currentIndex, pivotIndex, current)
  {
    const meta = this.state.meta || [];
    meta[currentIndex] = Object.assign(this.state.meta[currentIndex] || {}, current);
    meta[pivotIndex] = Object.assign(this.state.meta[pivotIndex] || {}, current);
    
    this.setState({
      meta: meta,
      items: [...items],
    });
  }
  
  render() {
    return (
      <div>
        <div className='viz'>
          {this.state.items && this.state.items.map((item, index) => {
            let baseClasses = 'viz-item';
            if (this.state.meta[index] && this.state.meta[index].partition) {
              baseClasses += ' viz-item--partitioned';    
            }
            if (this.state.meta[index] && this.state.meta[index].active) {
              baseClasses += ' viz-item--active';    
            }
            
            return (
              <div className={baseClasses} style={{
                width: (100 / this.state.items.length) + '%',
              }}>
                <div className='viz-item-indicator'></div>
                <div className='viz-item-inner' ref={this.state.meta[index].ref}>
                  <div className='viz-item-dot'></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  }
}

render(<App length={75} />, document.getElementById('root'));