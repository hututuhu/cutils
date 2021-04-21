function UniPromise(initFunc){
    this.states = {
      pending:"PENDING",/** 进行中 */
      fulfilled:"FULFULLED",/** 已完成 */
      reject:"REJECTED"/** 已失败 */
    }
    
    /** 初始化状态进行中 */
    this.state = this.states.pending;
    /** 成功的值 */
    this.resolveValue = undefined;
    /** 失败的值 */
    this.rejectError = undefined;
    this.resoveFuncSet = [];
    this.rejectFuncSet = [];
  
    var _this =this;
    var resolve = function(value){
      if(_this.state == _this.states.pending){
        _this.state = _this.states.fulfilled;
        _this.resolveValue = value;
        while(_this.resoveFuncSet.length){
          (_this.resoveFuncSet.pop())(value)
        }
      }
    }
  
    var reject = function(err){
      if(_this.state == _this.states.pending){
        _this.state = _this.states.reject;
        _this.rejectError = new Error(err);
        while(_this.resoveFuncSet.length){
          (_this.resoveFuncSet.pop())(err)
        }
      }
    }
  
    initFunc(resolve,reject)
  }
  
  UniPromise.prototype.then = function(resoveFunc,rejectFunc){
    if(this.state === this.states.fulfilled){
     resoveFunc(this.resolveValue);
    }else if(this.state === this.states.reject){
      rejectFunc(this.rejectError);
    }else {
      if(resoveFunc instanceof Function){
        this.resoveFuncSet.push(resoveFunc);
      }
  
      if(rejectFunc instanceof Function){
        this.rejectFuncSet.push(rejectFunc);
      }
    }
  }

  export default UniPromise;