class ReelPage extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.state = {
			readyToClose: true
		}
		this.currentlyActive = null
		this.comingSoon = false
		
		this.scrollable = false
		this.scrollFinishTimer
		
		// Parameters
		this.reservedTopBuffer = 0
		this.topBufferForVimeoView = 20
		this.bottomBufferForVimeoView = 60
		
		// UI
		this.vimeoView = new JABVimeoView('VimeoView')
		this.footer = new Footer('Footer')
	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
		
		this.startEventListeners()
	}
	
	
	
	//
	// Getters and Setters
	//
	
	get currentlyActive () {
		return this._currentlyActive
	}
	
	set currentlyActive (newCurrentlyActive) {
		var changed = this.currentlyActive != newCurrentlyActive
		
		if (changed) {
			this._currentlyActive = newCurrentlyActive
			
			if (!this.currentlyActive) {
				this.pauseReel()
			}
		}
	}
	
	
	requiredHeightForWidth (width) {
		return this.footer.bottom
	}
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		this.addVimeoView()
		this.addFooter()
	}
	
	
	addVimeoView () {
		this.addSubview(this.vimeoView)
	}
	
	addFooter () {
		this.addSubview(this.footer)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		this.configureVimeoView()
		this.positionVimeoView()
		
		this.configureFooter()
		this.positionFooter()
	}
	
	
	// Vimeo View
	
	configureVimeoView () {
		
		var vimeoId = '153864846'
		
		if (this.vimeoView.vimeoId != vimeoId) {
			this.vimeoView.vimeoId = vimeoId
		}
		
		
		this.vimeoView.blur = 0
		
		
		
	}
	
	positionVimeoView () {
		
		var newFrame = new CGRect()
					
		newFrame.size.width = applicationRoot.contentWidth
		newFrame.size.height = newFrame.size.width * (9.0/16.0)

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.reservedTopBuffer + this.topBufferForVimeoView
				
		this.vimeoView.frame = newFrame
		
	}
	
	
	
	
	// Footer
	configureFooter () {
		
		
	}
	
	positionFooter () {
		
		var view = this.footer
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = this.footer.requiredHeight

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.vimeoView.bottom + this.bottomBufferForVimeoView
		
		if (newFrame.origin.y + newFrame.size.height < this.height) {
			newFrame.origin.y = this.height - newFrame.size.height
		}
							
		view.frame = newFrame
		
	}
	
	
	
	//
	// Event Listeners
	//

	startEventListeners () {
		var reelPage = this
		
		$(this.selector).bind('mousewheel', function(evt) {
			
			if (!reelPage.scrollable) {
				evt.preventDefault()
			}
			
			clearTimeout(reelPage.scrollFinishTimer)
			if (reelPage.scrollTop <= 0) {
				reelPage.scrollFinishTimer = setTimeout(function () {
					reelPage.state.readyToClose = true
				}, 50)
			} else {
				reelPage.state.readyToClose = false
			}
			
			if (reelPage.readyToClose && evt.originalEvent.wheelDelta > 0) {
				evt.preventDefault()
			}
		})
	}
	
	
	//
	// Actions
	//
	
	
	// Video
	playReel () {
		if (this.vimeoView != null) {
			this.vimeoView.play()
		}
	}
	
	pauseReel () {
		if (this.vimeoView != null) {
			this.vimeoView.pause()
		}
	}
	
	//
	// Delegate
	//
	
}