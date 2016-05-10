/**
 *
 * @author 
 *
 */
class ActivityLayer extends egret.gui.SkinnableComponent {
	public closeBtn:egret.gui.Button;
	public newbagGroup:egret.gui.Group;
	public vipGroup:egret.gui.Group;
	public lifecardGroup: egret.gui.Group;
	public eggGroup: egret.gui.Group;
	public threeGroup: egret.gui.Group;
	public monthGroup: egret.gui.Group;
	
	public catGroup:egret.gui.Group;
	public accuGroup:egret.gui.Group;
	public blackGroup:egret.gui.Group;
	public selectGroup:egret.gui.Group;
	public selectGroup2:egret.gui.Group;
	public costdiamondGroup:egret.gui.Group;
	public growth_fundGroup:egret.gui.Group;
	public worthBoxGroup:egret.gui.Group;

	public newbagIsInit:any;
	public vipIsInit:any;
	public lifecardIsInit:any;
	public threeIsInit:any;
	public monthIsInit:any;
	public eggIsInit: any;
	public catIsInit:any;
	public accuIsInit:any;
	public blackIsInit:any;
	public costdiamondIsInit:any;
	public growth_fundIsInit: any;
	public worthBoxIsInit: any;

	public arrName:any;
	public arrBarName:any;

	public constructor() {
		super();
		this.newbagIsInit = true;
		this.vipIsInit = true;
		this.lifecardIsInit = true;
		this.threeIsInit =true;
		this.monthIsInit=true;
		this.eggIsInit = true;
		this.catIsInit = true;
		this.accuIsInit = true;
		this.blackIsInit = true;
		this.costdiamondIsInit = true;
		this.growth_fundIsInit = true;
		this.worthBoxIsInit = true;
		this.skinName = skins.dialog.ActivityLayerSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);

		this.onInitActivityName();
		this.initAllElement();
	}

	onInitActivityName(){
		this.arrName = ["","newbag","vip"];
		this.arrBarName = ["","首充奖励","VIP福利"];
		this.onInitLifeCardName();
		this.onInitEggName();
		this.onInitCatName();
		this.onInitAccuName();
		this.onInitBlackName();
		this.onInitCostDiamondName();
		this.onInitThreeName();
		this.onInitMonthName();
		this.onInitGrowthFund();
		this.onInitWorthBox();
	}

	onInitLifeCardName() {
		if(ActivityUtil.hasActivityOpened(ActivityType.LIFE_CARD)){
			this.arrName.push("lifecard");
			this.arrBarName.push("终身卡");
		}
	}

	onInitMonthName() {
		if(ActivityUtil.hasActivityOpened(ActivityType.MONTH_CARD)){
			this.arrName.push("month");
			this.arrBarName.push("月卡促销");
		}
	}

	onInitThreeName() {
		var isBought = !!gm.dataManage.firstPurchaseGiftTime;	
		var isByondTime = gm.dataManage.threeFinish == false;
		
		//判断入口资格
		if(isBought){
			if (gm.dataManage.threeFinish){ //参与过活动，但是过期
				return;
			}
		} else {
			if(!ActivityUtil.hasActivityOpened(ActivityType.FIRST_RECHARGE_GIFT)){ //未参与过活动，活动关闭
				return;
			}
		}

		//开启入口
		this.addThreeDialog();
	}

	addThreeDialog() {
		this.arrName.push("three");
		this.arrBarName.push("3元大礼包");
	}

	onInitEggName() {
		if(ActivityUtil.hasActivityOpened(ActivityType.SMASHING_GOLDEN_EGGS)){
			console.log("egg activity opened.");
			this.arrName.push("egg");
			this.arrBarName.push("砸金蛋");
			return;
		}

		console.log("egg activity is not open.");
	}

	onInitCatName(){
		if(ActivityUtil.hasActivityOpened(ActivityType.CAT_GO)){//Util.isChristmas()){
			this.arrName.push("cat");
			this.arrBarName.push("招财猫");
		}
	}

	onInitAccuName(){
		if(ActivityUtil.hasActivityOpened(ActivityType.RECHARGE_GIFT)){
			this.arrName.push("accu");
			this.arrBarName.push("累充福利");
		}
	}

	onInitBlackName(){
		if(ActivityUtil.hasActivityOpened(ActivityType.BLACK_MARKET)){
			this.arrName.push("black");
			this.arrBarName.push("超值限购");
		}
	}

	onInitCostDiamondName(){
		if(ActivityUtil.hasActivityOpened(ActivityType.TOTAL_DIAMOND_CONSUMPTION)){
			this.arrName.push("costdiamond");
			this.arrBarName.push("钻石返利");
		}
	}

	onInitGrowthFund() {
		if(ActivityUtil.hasActivityOpened(ActivityType.GROWTH_FUND))
		{
			this.arrName.push("growth_fund");
			this.arrBarName.push("成长基金");
		}
	}

	onInitWorthBox() {
		if(ActivityUtil.hasActivityOpened(ActivityType.WORTHBOX))
		{
			this.arrName.push("worthBox");
			this.arrBarName.push("超值宝箱");
		}		
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
		this.selectItemChangeStatus(event.target);
	}

	selectItemChangeStatus(target){
		var index:number = -1;
		for(var i:number = 1;i <= _.size(this.arrName) - 1;i++){
			var idx = i - 1;
			var item:uiskins.ActivityItemSelect = <uiskins.ActivityItemSelect>this.selectGroup2.getElementAt(idx);
			if(target == item){
				index = i;
				this.updateGroup(this.arrName[i]);
			}
		}
		if(index != -1){
			for(var i:number = 1;i <= _.size(this.arrName) - 1;i++){
				this.showGroup(this.arrName[i],(index == i));
				var idx = i - 1;
				var item:uiskins.ActivityItemSelect = <uiskins.ActivityItemSelect>this.selectGroup2.getElementAt(idx);
				item.dataItem.isSelect = (index == i);
				item.changeDataItem();
			}
		}
	}

	initAllElement(){
		var data:any;
		for(var i:number = 1;i <= _.size(this.arrName) - 1;i++){
			data = {
				isSelect:i == 1,
				iconSource:"activity_btn_" + this.arrName[i],
				name:this.arrBarName[i]
			};

			if (data.name=="3元大礼包")
			{
				data.iconSource="activity3_in";
			}

			var item = new uiskins.ActivityItemSelect(data);
			this.selectGroup2.addElement(item);
		}
		this.updateGroup(this.arrName[1]);
		this.showGroup(this.arrName[1],true);
	}

	showGroup(name,isShow){
		this[name + "Group"].visible = isShow;
	}

	updateGroup(name){
		if(this[name + "IsInit"]){
			this[name + "InitGroup"]();
			this[name + "IsInit"] = false;
		}
		else {
			this[name + "UpdateGroup"]();
		}
	}

	catInitGroup() {
		var group = new uiskins.ActivityCatGroup();
		this.catGroup.addElement(group);
	}

	catUpdateGroup(){

	}


	newbagInitGroup(){
		var group = new uiskins.ActivityNewBagGroup();
		this.newbagGroup.addElement(group);
	}

	newbagUpdateGroup(){

	}

	vipInitGroup(){
		var group = new uiskins.ActivityVipGroup(function(){
			gm.guiLayer.removeElement(this);
		}.bind(this));
		this.vipGroup.addElement(group);
	}

	vipUpdateGroup(){

	}

	lifecardInitGroup() {
		console.log("init life card group")
		var group = new uiskins.ActivityLifeCardGroup( function() {
			gm.guiLayer.removeElement(this);
		}.bind(this));

		this.lifecardGroup.addElement(group);
	}

	threeInitGroup() {
		var group = new uiskins.ActivityThree( function() {
			gm.guiLayer.removeElement(this);
		}.bind(this));

		this.threeGroup.addElement(group);
	}

	monthInitGroup() {
		var group = new uiskins.ActivityMonth( function() {
			gm.guiLayer.removeElement(this);
		}.bind(this));

		this.monthGroup.addElement(group);
	}

	lifecardUpdateGroup() {

	}

	threeUpdateGroup() {

	}

	monthUpdateGroup() {

	}

	eggInitGroup() {
		console.log("init egg group");
		var group = new uiskins.ActivityEggGroup( function() {
			gm.guiLayer.removeElement(this);
		}.bind(this));

		this.eggGroup.addElement(group);
	}

	eggUpdateGroup() {

	}


	accuInitGroup(){
		var group = new uiskins.ActivityAccuGroup();
		this.accuGroup.addElement(group);
	}

	accuUpdateGroup(){

	}

	blackInitGroup(){
		//var group = new uiskins.ActivityBlackGroup();
		var group = new uiskins.ActivityWorthGroup();  //todoyby
		this.blackGroup.addElement(group);
	}

	blackUpdateGroup(){

	}

	costdiamondInitGroup(){
		var group = new uiskins.ActivityCostDiamondGroup();
		this.costdiamondGroup.addElement(group);
	}

	costdiamondUpdateGroup(){

	}

	private growth_fundInitGroup()
	{
		var group = new uiskins.ActivityGrowthFund();
		this.growth_fundGroup.addElement(group);
	}

	private worthBoxInitGroup()
	{
		var group = new uiskins.ActivityWorthBox();
		this.worthBoxGroup.addElement(group);
	}	

	private growth_fundUpdateGroup()
	{

	}

	private worthBoxUpdateGroup()
	{
		
	}	

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
