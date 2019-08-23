let randomInt = ()=>{
	return Math.random().toString().slice(2,4)
}

Vue.component('tile', {
	props:['n'],
  template: '<div @click="onClicked">{{ n }}</div>',
  methods:{
  onClicked:function(){
  scoreboard.update(this.n)
  }
  },
  data: function () {
    return {
        n: this.n
    }
}
})

Vue.component('status_bar', {
	props:['Z','t'],
  template: '<div class="status_bar"> <span style="z-index:3">{{ Z }}</span> : <span>{{ t }}</span></div>',
  methods:{
  },
  data: function () {
    return {
        t: this.t
    }
}
})

Vue.component('guess', {
	props:['g'],
  template: ' <div>&nbsp;</div> ',
  methods:{

  },
  data: function () {
    return {
        n: this.g
    }
},
mounted:function(){
this.$vnode.elm.style.height=this.n+'%'
}
})

var scoreboard= new Vue({
  el: '#app',
  data: {
	Tries:0,
  TargetValue:randomInt(),
  guesses:[],
  Difference:0,
  values:new Array(8).fill(0).map(el=> randomInt()),
  },
  methods:{
  update: function (s) {
  		this.guesses.push(s)
      this.Tries+=1
    },
    },
    computed: {
    current_score: function () {
    if(this.guesses.length){
    let total = this.guesses.reduce((a,b)=>parseInt(b)+parseInt(a))
    let avg = total/this.guesses.length
    this.Difference = Math.abs((this.TargetValue-avg)).toFixed(2)
    return avg.toFixed(2)
    }
    this.Difference = this.TargetValue
    return 0
  },
	notes:function(){
  return this.guesses.map(el=>getNote(el))
  }
  }
  })


