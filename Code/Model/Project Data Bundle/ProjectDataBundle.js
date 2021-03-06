class ProjectDataBundle {

	constructor () {

		this.metaDataBundle = new ProjectMetaDataBundle()
		this.stillsBundle = new ProjectStillsBundle()
		this.videoBundle = new ProjectVideoBundle()

	}



	//
	// Custom Getters and Setters
	//

	// Id
	get id () {
		return this.metaDataBundle.id
	}

	set id (newId) {
		this.metaDataBundle.id = newId
		this.metaDataBundle = this.metaDataBundle
	}



	// Title
	get title () {
		return this.metaDataBundle.title
	}

	set title (newTitle) {
		this.metaDataBundle.title = newTitle
		this.metaDataBundle = this.metaDataBundle
	}


	// Director
	get director () {
		return this.metaDataBundle.director
	}

	set director (newDirector) {
		this.metaDataBundle.director = newDirector
		this.metaDataBundle = this.metaDataBundle
	}
	
	
	// Movie Type
	get movieType () {
		return this.metaDataBundle.movieType
	}

	set movieType (newMovieType) {
		this.metaDataBundle.movieType = newMovieType
		this.metaDataBundle = this.metaDataBundle
	}


	// Year
	get year () {
		return this.metaDataBundle.year
	}

	set year (newYear) {
		this.metaDataBundle.year = newYear
		this.metaDataBundle = this.metaDataBundle
	}
	
	
	// Description
	get description () {
		return this.metaDataBundle.description
	}
	
	set description (newDescription) {
		this.metaDataBundle.description = newDescription
		this.metaDataBundle = this.metaDataBundle
	}
	
	
	
	
	// No Video Message
	get noVideoMessage () {
		return this.metaDataBundle.noVideoMessage
	}
	
	set noVideoMessage (newNoVideoMessage) {
		this.metaDataBundle.noVideoMessage = newNoVideoMessage
		this.metaDataBundle = this.metaDataBundle
	}
	
	
	// Hidden
	get hidden () {
		return this.metaDataBundle.hidden
	}
	
	set hidden (newHidden) {
		this.metaDataBundle.hidden = newHidden
		this.metaDataBundle = this.metaDataBundle
	}
	
	
	
	
	
	
	



	// Vimeo Id
	get vimeoId () {
		return this.videoBundle.vimeoId
	}

	set vimeoId (newVimeoId) {
		this.videoBundle.vimeoId = newVimeoId
		this.videoBundle = this.videoBundle
	}
	
	
	// Vimeo Width To Height
	get vimeoHeightToWidth () {
		return this.videoBundle.vimeoHeightToWidth
	}
	
	set vimeoHeightToWidth (newVimeoHeightToWidth) {
		this.videoBundle.vimeoHeightToWidth = newVimeoHeightToWidth
		this.videoBundle = this.videoBundle
	}
	
	
	// Stills
	get stills () {
		return this.stillsBundle.stills
	}
	
	set stills (newStills) {
		this.stillsBundle.stills = newStills
		this.stillsBundle = this.stillsBundle
	}
	
	
	// Main Still Index
	get mainStillIndex () {
		return this.stillsBundle.mainStillIndex
	}
	
	set mainStillIndex (newMainStillIndex) {
		this.stillsBundle.mainStillIndex = newMainStillIndex
		this.stillsBundle = this.stillsBundle
	}
	
	
	



	// Main Still
	get mainStill () {
		return this.stillsBundle.mainStill
	}

	set mainStill (newMainStill) {
		this.stillsBundle.mainStill = newMainStill
		this.stillsBundle = this.stillsBundle
	}




	// Secondary Stills
	get secondaryStills () {
		return this.stillsBundle.secondaryStills
	}

	set secondaryStills (newSecondaryStills) {
		this.stillsBundle.secondaryStills = newSecondaryStills
		this.stillsBundle = this.stillsBundle
	}



}
