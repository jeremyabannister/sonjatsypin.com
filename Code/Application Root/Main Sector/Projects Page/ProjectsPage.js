class ProjectsPage extends JABView {

	constructor (customId) {
		super(customId)
		
		
		// State
		this.state = {
			projectDataBundles: this.assembleProjectDataBundles(),
			comingSoon: false,
			
			scrollable: false,
			readyToClose: true,
			
			selectedProject: null,
			selectedProjectIndex: null,
			
			
			currentInfoTab: null,
			queuedInfoTab: null,
		}
		
		
		
		
		this.scrollFinishTimer

		
		// Parameters
		this.parameters = {
			reservedTopBuffer: 0,
			
			numberOfColumns: 2,
			topBufferForGrid: 58,
			betweenBufferForGridRows: 10,
			betweenBufferForGridColumns: 10,
			bottomBufferForGrid: 50,
			
			gridAnimationDuration: 250,
			gridAnimationEasingFunction: 'ease-in-out',
			
			truePositionsOfProjectPanes: [],
		}
		
		
		// UI
		this.projectInfoTab = new ProjectInfoTab('ProjectInfoTab')
		this.projectInfoTabBackup = new ProjectInfoTab('ProjectInfoTabBackup')
		this.projectPanes = []
		for (var i = 0; i < this.state.projectDataBundles.length; i++) {
			this.projectPanes.push(new ProjectImageView())
			this.parameters.truePositionsOfProjectPanes.push(new CGRect())
		}
		this.footer = new Footer('Footer')
		
		
		this.state.queuedInfoTab = this.projectInfoTab
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
	
	requiredHeightForWidth (width) {
		
		return this.footer.bottom
	}
	
	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addProjectInfoTab()
		this.addProjectInfoTabBackup()
		this.addProjectPanes()
		this.addFooter()
		
	}
	
	
	
	addProjectInfoTab () {
		this.addSubview(this.projectInfoTab)
	}
	
	addProjectInfoTabBackup () {
		this.addSubview(this.projectInfoTabBackup)
	}
	
	addProjectPanes () {
		for (var i = 0; i < this.projectPanes.length; i++) {
			this.addSubview(this.projectPanes[i])
		}
	}
	
	
	addFooter () {
		this.addSubview(this.footer)
	}
	

	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.manageProjectInfoTabs()
		
		this.configureProjectInfoTab()
		this.positionProjectInfoTab()
		
		this.configureProjectInfoTabBackup()
		this.positionProjectInfoTabBackup()
		

		this.configureProjectPanes()
		this.positionProjectPanes()
		
		this.configureFooter()
		this.positionFooter()
		
	}

	
	
	
	// Project Info Tabs
	manageProjectInfoTabs () {
		
		if (this.state.queuedInfoTab == null) {
			this.state.queuedInfoTab = this.projectInfoTab
		}
		
	}
	
	
	// Project Info Tab
	configureProjectInfoTab () {
		
		
		var view = this.projectInfoTab
		
		view.state.projectDataBundle = this.state.projectDataBundles[this.state.selectedProjectIndex]
		view.configureDuration = this.parameters.gridAnimationDuration
		
		if (this.state.selectedProject == null) {
			view.opacity = 0
		} else {
			view.opacity = 1
		}
		
		view.updateAllUI()
	}
	
	positionProjectInfoTab () {
		var view = this.projectInfoTab
		var newFrame = new CGRect()
							
		newFrame.size.width = (applicationRoot.contentWidth - ((this.parameters.numberOfColumns - 1) * this.parameters.betweenBufferForGridColumns))/this.parameters.numberOfColumns
		newFrame.size.height = (newFrame.size.width * (9.0/16.0))/2 - this.parameters.betweenBufferForGridRows
		
		
		if (this.state.selectedProject == null) {
			newFrame.origin.y = this.height
		} else {
			
			if (this.state.selectedProjectIndex % this.parameters.numberOfColumns == 0) {
				newFrame.origin.x = this.state.selectedProject.right + this.parameters.betweenBufferForGridColumns
			} else {
				newFrame.origin.x = this.state.selectedProject.x - newFrame.size.width - this.parameters.betweenBufferForGridColumns
			}
			
			newFrame.origin.y = this.state.selectedProject.y
		}
		
							
		view.frame = newFrame
	}
	
	
	// Project Info Tab Backup
	configureProjectInfoTabBackup () {
		
		var view = this.projectInfoTabBackup
		
		view.state.projectDataBundle = this.state.projectDataBundles[this.state.selectedProjectIndex]
		view.configureDuration = this.parameters.gridAnimationDuration
		
		if (this.state.selectedProject == null) {
			view.opacity = 0
		} else {
			view.opacity = 1
		}
		
		view.updateAllUI()
	}
	
	positionProjectInfoTabBackup () {
		var view = this.projectInfoTabBackup
		var newFrame = new CGRect()
							
		newFrame.size.width = (applicationRoot.contentWidth - ((this.parameters.numberOfColumns - 1) * this.parameters.betweenBufferForGridColumns))/this.parameters.numberOfColumns
		newFrame.size.height = (newFrame.size.width * (9.0/16.0))/2 - this.parameters.betweenBufferForGridRows
		
		
		if (this.state.selectedProject == null) {
			newFrame.origin.y = this.height
		} else {
			
			if (this.state.selectedProjectIndex % this.parameters.numberOfColumns == 0) {
				newFrame.origin.x = this.state.selectedProject.right + this.parameters.betweenBufferForGridColumns
			} else {
				newFrame.origin.x = this.state.selectedProject.x - newFrame.size.width - this.parameters.betweenBufferForGridColumns
			}
			
			newFrame.origin.y = this.state.selectedProject.y
		}
		
							
		view.frame = newFrame
	}
	
	
	
	
	
	


	// Project Rows
	configureProjectPanes () {

		for (var i = 0; i < this.projectPanes.length; i++) {
			var view = this.projectPanes[i]
			
			view.state.src = this.state.projectDataBundles[i].stills[this.state.projectDataBundles[i].mainStillIndex]
			if (this.state.comingSoon) {
				view.opacity = 0
			}
			
			view.overflow = 'hidden'
			view.positionDuration = this.parameters.gridAnimationDuration
			view.positionEasingFunction = this.parameters.gridAnimationEasingFunction
			view.cursor = 'pointer'
			view.clickable = true
			
			if (this.state.selectedProject != null) {
				if (view == this.state.selectedProject) {
					view.state.covered = false
				} else {
					view.state.covered = true
				}
			} else {
				view.state.covered = false
			}
			
			
			view.updateAllUI()
		}

	}

	positionProjectPanes () {

		if (!this.state.comingSoon) {
			for (var i = 0; i < this.projectPanes.length; i++) {
				var view = this.projectPanes[i]
				var newFrame = new CGRect()
				
				newFrame.size.width = (applicationRoot.contentWidth - ((this.parameters.numberOfColumns - 1) * this.parameters.betweenBufferForGridColumns))/this.parameters.numberOfColumns
				newFrame.size.height = newFrame.size.width * (9.0/16.0)
				
				
				var verticalAdjustment = 0
				if (this.state.selectedProject != null) {
					if (i >= this.state.selectedProjectIndex - (this.state.selectedProjectIndex % this.parameters.numberOfColumns) && i != this.state.selectedProjectIndex) {
						if (i % this.parameters.numberOfColumns != this.state.selectedProjectIndex % this.parameters.numberOfColumns) {
							verticalAdjustment = newFrame.size.height/2
						}
					}
				}
				
				
				newFrame.origin.x = (this.width - applicationRoot.contentWidth)/2 + ((i % this.parameters.numberOfColumns) * (newFrame.size.width + this.parameters.betweenBufferForGridColumns))
				newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.topBufferForGrid + (Math.floor(i/this.parameters.numberOfColumns) * (newFrame.size.height + this.parameters.betweenBufferForGridRows)) + verticalAdjustment
				
				view.frame = newFrame
				
				
				// Keep track of where the project panes are supposed to be when they are not shifted to make room for info tab. This is done so that incoming info tab can be placed relative to where the project pane will be, not where it is in its currently shifted position
				var truePosition = newFrame.copy()
				truePosition.y -= verticalAdjustment
				this.parameters.truePositionsOfProjectPanes[i] = truePosition
				
			}
		}
		
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
		
		if (!this.state.comingSoon) {
			if (this.projectPanes.length > 0) {
				var lowestBottom = 0
				for (var i = 0; i < this.parameters.numberOfColumns; i++) {
					var index = this.projectPanes.length - 1 - i
					if (this.projectPanes.length > index) {
						if (this.projectPanes[index].bottom > lowestBottom) {
							lowestBottom = this.projectPanes[index].bottom
						}
					}
				}
				newFrame.origin.y = lowestBottom + this.parameters.bottomBufferForGrid
			}
			
			if (newFrame.origin.y + newFrame.size.height < this.height) {
				newFrame.origin.y = this.height - newFrame.size.height
			}
		} else {
			newFrame.origin.y = this.height - newFrame.size.height
		}
		
							
		view.frame = newFrame
		
	}
	
	
	
	
	
	
	//
	// Event Listeners
	//

	startEventListeners () {
		var projectsPage = this
		
		$(this.selector).bind('mousewheel', function(evt) {
			
			if (!projectsPage.state.scrollable) {
				evt.preventDefault()
			} else {
				projectsPage.configureProjectPanes()
			}
			
			clearTimeout(projectsPage.scrollFinishTimer)
			if (projectsPage.scrollTop <= 0) {
				projectsPage.scrollFinishTimer = setTimeout(function () {
					projectsPage.state.readyToClose = true
				}, 50)
			} else {
				projectsPage.state.readyToClose = false
			}
			
			if (projectsPage.state.readyToClose && evt.originalEvent.wheelDelta > 0) {
				evt.preventDefault()
			}
		})
	}




	//
	// Actions
	//


	assembleProjectDataBundles () {

		var dataBundles = []

		
		
		// Powder Room
		var dataBundle = new ProjectDataBundle()
		dataBundle.id = 'powderRoom'
		dataBundle.title = 'POWDER ROOM'
		dataBundle.subtitle = 'dir. SONJA TSYPIN | SHORT | 2016'
		dataBundle.year = '2016'
		
		dataBundle.vimeoId = '167824606'
		dataBundle.vimeoHeightToWidth = (1.0/2.35)
		
		var pathStem = './Resources/Images/Projects Page/Project Data Bundles/1/'
		for (var i = 0; i < 4; i++) {
			var index = i + 1
			dataBundle.stills.push(pathStem + 'still' + index + '.jpg')
		}
		dataBundle.mainStillIndex = 3
		

		dataBundles.push(dataBundle)
		
		
		
		
		
		// Angels
		dataBundle = new ProjectDataBundle()
		dataBundle.id = 'angels'
		dataBundle.title = 'ANGELS'
		dataBundle.subtitle = 'dir. AUDREY BANKS'
		dataBundle.year = '2015'
		
		var pathStem = './Resources/Images/Projects Page/Project Data Bundles/2/'
		for (var i = 0; i < 5; i++) {
			var index = i + 1
			dataBundle.stills.push(pathStem + 'still' + index + '.jpg')
		}
		dataBundle.mainStillIndex = 3
		

		dataBundles.push(dataBundle)
		
		
		
		
		
		// Birth Day
		dataBundle = new ProjectDataBundle()
		dataBundle.id = 'birthday'
		dataBundle.title = 'BIRTH DAY'
		dataBundle.subtitle = 'dir. EVA EVANS'
		dataBundle.year = '2016'
		
		dataBundle.vimeoId = '167678674'
		dataBundle.vimeoHeightToWidth = (9.0/16.0)
		
		var pathStem = './Resources/Images/Projects Page/Project Data Bundles/3/'
		for (var i = 0; i < 1; i++) {
			var index = i + 1
			dataBundle.stills.push(pathStem + 'still' + index + '.jpg')
		}
		dataBundle.mainStillIndex = 0
		

		dataBundles.push(dataBundle)
		
		
		
		
		
		// Powder Room Duplicate
		dataBundle = new ProjectDataBundle()
		dataBundle.id = 'powderRoom'
		dataBundle.title = 'POWDER ROOM'
		dataBundle.subtitle = 'dir. SONJA TSYPIN'
		dataBundle.year = '2016'
		
		dataBundle.vimeoId = '167824606'
		dataBundle.vimeoHeightToWidth = (1.0/2.35)
		
		var pathStem = './Resources/Images/Projects Page/Project Data Bundles/1/'
		for (var i = 0; i < 4; i++) {
			var index = i + 1
			dataBundle.stills.push(pathStem + 'still' + index + '.jpg')
		}
		dataBundle.mainStillIndex = 1
		

		dataBundles.push(dataBundle)
		
		

		return dataBundles
	}
	
	
	//
	// Delegate
	//
	
	// JABView
	viewWasClicked (view) {
		

		
		if (this.state.selectedProject != null) {
			if (view != this.state.selectedProject) {
				// If a project is currently open and now we need to open a different one
				this.state = {
					selectedProject: view,
					selectedProjectIndex: this.projectPanes.indexOf(view)
				}
				this.animatedUpdate()
			} else {
				// If the currently open project has just been clicked on (close it)
				this.state = {
					selectedProject: null,
					selectedProjectIndex: null,
				}
				this.animatedUpdate()
			}
		} else {
			// If no project is currently open and a project has just been selected
			this.state = {
				selectedProject: view,
				selectedProjectIndex: this.projectPanes.indexOf(view),
			}
			this.animatedUpdate()
		}
	}
	
	
	
	// Project Info Tab
	projectInfoTabPlayButtonWasClicked (projectInfoTab) {
		this.parent.projectsPageWantsToDisplayProject(this, this.state.projectDataBundles[this.state.selectedProjectIndex])
	}
	
	projectInfoTabInfoButtonWasClicked (projectInfoTab) {
		this.parent.projectsPageWantsToDisplayProject(this, this.state.projectDataBundles[this.state.selectedProjectIndex])
	}

}
