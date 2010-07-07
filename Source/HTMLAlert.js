var HTMLAlert = new Class({
	Implements:[Options,Events],

	options:{
		id:'HTMLAlert',
		buttonText:'Ok'
	},

	elements:{
		window:null,
		body:null,
		container:null,
		mask:null,
		dialogue:null,
		button:null
	},

	messages:[],

	initialize:function(message,options){
		this.setOptions(options);

		var previousAlert = $(this.options.id);
		var extendPrevious = (previousAlert) ? previousAlert.retrieve('addMessage') : null;

		if(extendPrevious)
			return extendPrevious(message);

		this.addMessage(message);
		this.generateAlert();
	},

	generateAlert:function(){
		var els = this.elements;
		
		els.window = $(window);
		els.body = $(document.body);

		this.windowUpdate();

		els.container = new Element('div',{
			id:this.options.id,
			styles:{
				position:'fixed',
				top:0,
				left:0,
				width:'100%',
				height:'100%',
				zIndex:99999
			}
		}).inject(els.body);

		els.container.store('addMessage',this.addMessage.bind(this));

		els.mask = new Element('div',{
			styles:{
				position:'absolute',
				width:'100%',
				height:'100%',
				backgroundColor:'#000000',
				opacity:'.5'
			}
		}).inject(els.container);
		
		els.dialogue = new Element('div',{
			'class':'Module alert-dialogue'
		}).inject(els.container);
		
		els.currentMessage = new Element('p',{
			text:this.messages[0]
		}).inject(els.dialogue);
		
		this.messages.splice(0,1);
		
		els.button = new Element('button',{
			html:'<span>'+this.options.buttonText+'</span>',
			events:{ click:this.confirmMessage.bind(this) }
		}).inject(els.dialogue);
	},
	
	confirmMessage:function(e){
		if(e && e.stop) e.stop();
		
		if(this.messages.length===0)
			return this.clean();
		
		this.elements.currentMessage.set('text',this.messages[0]);
		
		this.messages.splice(0,1);
	},
	
	clean:function(){
		this.elements.container.destroy();
	},

	addMessage:function(message){
		this.messages[this.messages.length] = message;
	},

	windowUpdate:function(){
		this.options.windowInfo = this.elements.window.getSize();
	},

	windowAdjust:function(){
		this.windowUpdate();
	}
});

HTMLAlert.extend({
	prepare:function(bool){
		if(!bool) return;

		if(!window.Alert)
			window.Alert = function(message,options){ return new HTMLAlert(message,options); };
	}
});