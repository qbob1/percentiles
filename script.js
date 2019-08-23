let randomInt = ()=>{
	return Math.random().toString().slice(2,4)
}

let getNote = (number) =>{
	if(number < 3){
  return 'A'.concat(number)
  }if(number >= 3 && number < 6){
  return 'B'.concat(number-3)
  }
  if(number >= 6 && number < 10){
  return 'C'.concat(number-6)
  }
}
var synth = new Tone.Synth().toMaster()

Vue.component('tile', {
	props:['n'],
  template: '<div @click="onClicked">{{ n }}</div>',
  methods:{
  onClicked:function(){
  synth.triggerAttackRelease(getNote(this.n[0]), '8n')
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
  template: '<div> <span style="z-index:3">{{ Z }}</span> : <span>{{ t }}</span></div>',
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
  template: ' <transition name="fade"> <div>&nbsp;</div>  </transition>',
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

var scoreboard = new Vue({
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
  reset:function(){
  let guesses = this.guesses
  let guess_index = 0
  const synthPart = new Tone.Sequence(
    function(time, note) {
    	console.log(guesses[guess_index])
      guesses[guess_index]=0
      synth.triggerAttackRelease(note, "10hz", time);
      guess_index++
    },
    this.notes,
    "8n"
  );
  console.log(this.guesses)
	synthPart.loop=1;
  synthPart.start();
  Tone.Transport.start()
  }
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


