(() => {
  "use strict";

  let checkForNativeMethods = (runUnderbarFunction) => {
    it("should not use the native version of any underbar methods in its implementation", () => {
      // These spies are set up in testSupport.js
      runUnderbarFunction();
      expect(Array.prototype.map.called).to.equal(false);
      expect(Array.prototype.indexOf.called).to.equal(false);
      expect(Array.prototype.forEach.called).to.equal(false);
      expect(Array.prototype.filter.called).to.equal(false);
      expect(Array.prototype.reduce.called).to.equal(false);
      expect(Array.prototype.every.called).to.equal(false);
      expect(Array.prototype.some.called).to.equal(false);
    });
  };

  describe("Part II", () => {
    describe("contains", () => {
      it("should not mutate the input array", () => {
        let input = [1, 2, 3, 4, 5];
        let result = _.contains(input, 4);

        /*
         * Mutation of inputs should be avoided without good justification otherwise
         * as it can often lead to hard to find bugs and confusing code!
         * Imagine we were reading the code above, and we added the following line:
         *
         * let lastElement = input[input.length - 1];
         *
         * Without knowing that mutation occured inside of reduceRight,
         * we would assume that `lastElement` is 5. But if inside of
         * reduceRight, we use the array method `pop`, we would permanently
         * change `input` and our assumption would not longer be true,
         * `lastElement` would be 4 instead!
         *
         * The tricky part is that we have no way of knowing about the mutation
         * just by looking at the code above. We'd have to dive into the
         * implementation of reduceRight to the exact line that uses `pop`.
         * If we write a lot of code with this assumption, it might be very hard
         * to trace back to the correct line in reduceRight.
         *
         * You can avoid an entire class of bugs by writing functions
         * that don't mutate their inputs!
         */

        expect(input).to.eql([1, 2, 3, 4, 5]);
      });

      it("should return true given an array and a value from that array", () => {
        let array = [1, 2, 3];
        let value = 1;
        expect(_.contains(array, value)).to.be.true;
      });

      it("should return false given an array and a value not in that array", () => {
        let array = [1, 2, 3, 4];
        let value = 5;
        expect(_.contains(array, value)).to.be.false;
        // Replace this line with an `expect` statement that tests
        // the behavior described by the `it` string
        // throw new Error('This test is missing.');
      });

      it("should return true given a object and a value from that object", () => {
        let object = { a: 1, b: 2, c: 3 };
        let value = 1;
        expect(_.contains(object, value)).to.be.true;
      });

      it("should return false given an object and a value not in that object", () => {
        let object = { a: 1, b: 2, c: 3 };
        let value = 4;
        expect(_.contains(object, value)).to.be.false;
      });
    });

    describe("every", () => {
      let isEven = (num) => {
        return num % 2 === 0;
      };

      it("passes by default for an empty collection", () => {
        expect(_.every([], _.identity)).to.be.true;
      });

      it("passes for a collection of all-truthy values", () => {
        expect(_.every([true, {}, 1], _.identity)).to.be.true;
      });

      it("fails for a collection of all-falsy values", () => {
        // Replace this line with an `expect` statement that tests
        // the behavior described by the `it` string
        // throw new Error('This test is missing.');
        expect(_.every(["", 0, false, null, undefined, NaN], _.identity)).to.be
          .false;
      });

      it("fails for a collection containing mixed falsy and truthy values", () => {
        expect(_.every([true, false, 1], _.identity)).to.be.false;
        expect(_.every([1, undefined, true], _.identity)).to.be.false;
      });

      it("should work when provided a collection containing undefined values", () => {
        expect(_.every([undefined, undefined, undefined], _.identity)).to.be
          .false;
      });

      it("should cast the result to a boolean", () => {
        expect(_.every([1], _.identity)).to.be.true;
        expect(_.every([0], _.identity)).to.be.false;
      });

      it("should handle callbacks that manipulate the input", () => {
        expect(_.every([0, 10, 28], isEven)).to.be.true;
        expect(_.every([0, 11, 28], isEven)).to.be.false;
      });

      it("should work when no callback is provided", () => {
        expect(_.every([true, true, true])).to.be.true;
        expect(_.every([true, true, false])).to.be.false;
        expect(_.every([false, false, false])).to.be.false;
      });
    });

    describe("some", () => {
      let isEven = (number) => {
        return number % 2 === 0;
      };

      it("should fail by default for an empty collection", () => {
        expect(_.some([])).to.be.false;
      });

      it("should pass for a collection of all-truthy results", () => {
        expect(_.some([true, {}, 1], _.identity)).to.be.true;
      });

      it("should fail for a collection of all-falsy results", () => {
        expect(_.some([null, 0, undefined], _.identity)).to.be.false;
      });

      it("should pass for a collection containing mixed falsy and truthy results", () => {
        expect(_.some([true, false, 1], _.identity)).to.be.true;
      });

      it("should pass for a set containing one truthy value that is a string", () => {
        expect(_.some([null, 0, "yes", false], _.identity)).to.be.true;
      });

      it("should fail for a set containing no matching values", () => {
        // Replace this line with an `expect` statement that tests`
        // the behavior described by the `it` string
        //throw new Error('This test is missing.');
        expect(_.some([2, 2, 2], (elm) => elm === "")).to.be.false;
      });

      it("should pass for a collection containing one matching value", () => {
        expect(_.some([1, 10, 29], isEven)).to.be.true;
      });

      it("should cast the result to a boolean", () => {
        expect(_.some([1], _.identity)).to.be.true;
        expect(_.some([0], _.identity)).to.be.false;
      });

      it("should work when no callback is provided", () => {
        expect(_.some([true, true, true])).to.be.true;
        expect(_.some([true, true, false])).to.be.true;
        expect(_.some([false, false, false])).to.be.false;
      });
    });

    describe("extend", () => {
      it("returns the first argument", () => {
        let destination = {};
        let source = {};
        let extended = _.extend(destination, source);

        expect(extended).to.equal(destination);
      });

      it("should extend an object with the attributes of another", () => {
        let destination = {};
        let source = { a: "b" };
        let extended = _.extend(destination, source);

        expect(extended.a).to.equal("b");
      });

      it("should override properties found on the destination", () => {
        // Replace this line with an `expect` statement that tests
        // the behavior described by the `it` string
        // throw new Error('This test is missing.');
        let destination = { a: 1 };
        let source = { a: "b" };
        let extended = _.extend(destination, source);

        expect(extended.a).to.equal("b");
      });

      it("should not override properties not found in the source", () => {
        let destination = { x: "x" };
        let source = { a: "b" };
        let extended = _.extend(destination, source);

        expect(extended.x).to.equal("x");
      });

      it("should extend from multiple source objects", () => {
        let extended = _.extend({ x: 1 }, { a: 2 }, { b: 3 });

        expect(extended).to.eql({ x: 1, a: 2, b: 3 });
      });

      it("in the case of a conflict, it should use the last property's values when extending from multiple source objects", () => {
        let extended = _.extend({ x: "x" }, { a: "a", x: 2 }, { a: 1 });

        expect(extended).to.eql({ x: 2, a: 1 });
      });
    });

    describe("defaults", () => {
      it("should return the original target object", () => {
        /*
         * Our defaults should only modify the contents of the original object,
         * it should not create a new object with all the same properties
         *
         * We can test this by using the identity operator (===)
         *
         * If we assign a letiable to the result of _.defaults() and it === a letiable assigned
         * to our initial object, then both letiables are indeed references to the same object
         * and we are guaranteed that only the contents of our original object were modified
         */

        let destination = {};
        let source = {};
        let defaulted = _.defaults(destination, source);

        expect(defaulted).to.equal(destination); // .equal uses (===) under the hood
      });

      it("should copy a property if that key is not already set on the target", () => {
        /*
         * Be careful when using `arguments`. It's specified as a weird "Array-like object"
         * that's not really an array and not really even an object. This means normal operations
         * we would expect to work on objects (`for in`, `Object.keys`) and arrays (`push`, `pop`)
         * might not work as expected on `arguments`.
         *
         * In fact, the behavior of `arguments` is left up to letious JavaScript engines to implement.
         * You might have noticed that running this exact same test works fine in Chrome or Firefox.
         * This is because the engines powering these browsers are smart enough to understand
         * the nuances of this complicated structure and might force it to act as expected.
         *
         * It turns out that the engine powering our runtime environment for these tests
         * is not as smart as Chrome and does not understand how to `for in` over the `arguments` object
         *
         * This could be considered a bug in our test environment but is better thought of as a learning
         * opportunity. The safest thing to do when working with `arguments` is convert it into a
         * real array that every JavaScript engine will know how to handle.
         *
         * If you're not sure how to do that, Stack Overflow has plenty to say on the topic.
         */

        let destination = {};
        let source = { a: 1 };

        _.defaults(destination, source);

        expect(destination.a).to.equal(1);
      });

      it("should copy any property whose key is not already set on the target", () => {
        // Replace this line with an `expect` statement that tests
        // the behavior described by the `it` string
        // throw new Error("This test is missing.");
        let destination = { a: 10 };
        let source = { a: 1, b: 2 };
        _.defaults(destination, source);

        expect(destination.b).to.be.equal(2);
      });

      it("should not copy a property if that key is already set on the target", () => {
        let destination = { a: 10 };
        let source = { a: 1 };

        _.defaults(destination, source);

        expect(destination.a).to.equal(10);
      });

      it("should not copy any property whose key is already set on the target", () => {
        let destination = { a: 1, b: 2 };
        let source = { a: 100, b: 200, c: 300 };

        _.defaults(destination, source);

        expect(destination.a).to.equal(1);
        expect(destination.b).to.equal(2);
        expect(destination.c).to.equal(300);
      });

      it("should not copy a property if that key is already set on the target, even if the value for that key is falsy", () => {
        /*
         * When the value provided to an if() condition is not a strict boolean,
         * it will first be coerced into one and then evaluated
         *
         * A value is considered 'falsy' if, when coerced, it evaluates to `false`.
         * You can check the coerced boolean with either `Boolean(myValue)` or `!!myValue`
         *
         * This could be a problem because falsy values are valid in our object. If we aren't
         * precise enough with our conditional check, we might get these unexpected results
         */

        let destination = { a: "", b: 0, c: NaN };
        let source = { a: 1, b: 2, c: 3 };

        _.defaults(destination, source);

        expect(destination.a).to.equal("");
        expect(destination.b).to.equal(0);
        expect(isNaN(destination.c)).to.equal(true);
      });

      it("should copy properties source an arbitrary number of source objects", () => {
        let destination = {};
        let source = { a: 1 };
        let anotherSource = { b: 2, c: "three" };
        let aThirdSource = { d: "four" };

        _.defaults(destination, source, anotherSource, aThirdSource);

        expect(destination.a).to.equal(1);
        expect(destination.b).to.equal(2);
        expect(destination.c).to.equal("three");
        expect(destination.d).to.equal("four");
      });

      it("should prefer the first value found when two objects are provided with properties at the same key", () => {
        let destination = {};
        let source = { a: 1 };
        let anotherSource = { a: "one" };

        _.defaults(destination, source, anotherSource);

        expect(destination.a).to.equal(1);
      });
    });

    describe("once", () => {
      it("should return a function", () => {
        // noop is short for `no-operation` and is pronounced `no-op`
        let noop = _.once(() => {});

        expect(noop).to.be.an.instanceOf(Function);
      });

      it("should only run a user-defined if it has not been run before", () => {
        let num = 0;
        let increment = _.once(() => {
          num++;
        });

        increment();
        increment();
        increment();

        expect(num).to.equal(1);
      });

      it("should apply arguments to the user-defined function", () => {
        let add = _.once((x, y, z) => {
          return x + y + z;
        });
        expect(add(1, 2, 3)).to.equal(6);
      });

      it("should return the result of the first call for every subsequent call", () => {
        let add = _.once((x, y, z) => {
          return x + y + z;
        });

        expect(add(1, 2, 3)).to.equal(6);
        expect(add(4, 5, 6)).to.equal(6);
        expect(add(7, 8, 9)).to.equal(6);
      });
    });

    describe("memoize", () => {
      let add, memoAdd;

      beforeEach(() => {
        add = (a, b) => {
          return a + b;
        };

        memoAdd = _.memoize(add);
      });

      it("should produce the same result as the non-memoized version", () => {
        expect(add(1, 2)).to.equal(3);
        expect(memoAdd(1, 2)).to.equal(3);
      });

      it("should give different results for different arguments", () => {
        expect(memoAdd(1, 2)).to.equal(3);
        expect(memoAdd(3, 4)).to.equal(7);
        expect(memoAdd(1, 3)).to.equal(4);
      });

      it("should not run the memoized twice when given a primitive type as an argument", () => {
        // Here, we wrap a dummy in a spy. A spy is a wrapper (much like _.memoize
        // or _.once) that keeps track of interesting information about the it's spying on;
        // e.g. whether or not the has been called.
        let spy = sinon.spy(() => {
          return "Dummy output";
        });
        let memoSpy = _.memoize(spy);

        memoSpy(10);
        expect(spy).to.have.been.calledOnce;
        memoSpy(10);
        expect(spy).to.have.been.calledOnce;
      });

      it("should not run the memoized twice when given a reference type as an argument", () => {
        // Be careful how you are checking if a set of arguments has been passed in already
        let spy = sinon.spy(() => {
          return "Dummy output";
        });
        let memoSpy = _.memoize(spy);

        memoSpy([1, 2, 3]);
        expect(spy).to.have.been.calledOnce;
        memoSpy([1, 2, 3]);
        expect(spy).to.have.been.calledOnce;
      });

      it("should run the memoized twice when given an array and then given a list of arguments", () => {
        // Be careful how you are checking if a set of arguments has been passed in already
        let spy = sinon.spy(() => {
          return "Dummy output";
        });
        let memoSpy = _.memoize(spy);

        memoSpy([1, 2, 3]);
        expect(spy).to.have.been.calledOnce;
        memoSpy(1, 2, 3);
        expect(spy).to.have.been.calledTwice;
      });
    });

    describe("delay", () => {
      let callback;

      beforeEach(() => {
        callback = sinon.spy();
      });

      it("should only execute the after the specified wait time", () => {
        _.delay(callback, 100);
        clock.tick(99);

        expect(callback).to.have.not.been.called;

        clock.tick(1);

        expect(callback).to.have.been.calledOnce;
      });

      it("should have successfully passed arguments in", () => {
        _.delay(callback, 100, 1, 2);
        clock.tick(100);

        expect(callback).to.have.been.calledWith(1, 2);
      });
    });

    describe("shuffle", () => {
      it("should not modify the original object", () => {
        let numbers = [4, 5, 6];
        let shuffled = _.shuffle(numbers).sort();

        expect(shuffled).to.not.equal(numbers);
        expect(numbers).to.eql([4, 5, 6]);
      });

      it("should maintain same array length", () => {
        let numbers = [1, 1, 2, 3];
        let shuffled = _.shuffle(numbers);

        expect(shuffled.length).to.equal(numbers.length);
      });

      it("should have the same elements as the original object", () => {
        let numbers = [4, 5, 6];
        let shuffled = _.shuffle(numbers).sort();

        expect(shuffled).to.eql([4, 5, 6]);
      });

      it("should not be in the same order as the original object", () => {
        let numbers = [4, 5, 6, 7, 8, 9, 10];
        let shuffled = _.shuffle(numbers);

        // This test will fail 1/9! times
        expect(shuffled).to.not.eql([4, 5, 6, 7, 8, 9, 10]);
      });
    });
  });
})();
