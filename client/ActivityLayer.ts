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
		this.arrName = [""];
		this.arrBarName = [""];		

		//init bar name 
		var config = ActivityUtil.config;
		for(var i:number = 0;i < _.size(config);i++){
			var cfg = config[i];
			console.log("cfg" + JSON.stringify(cfg));
			if (this.isOpenActvity(cfg.type)){
				this.arrName.push(cfg.arrName);
				this.arrBarName.push(cfg.arrBarName);				
			}
		}
	}

	isOpenActvity(type) {
		var isOpen = ActivityUtil.hasActivityOpened(type);

		return isOpen;
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
		this.selectItemChangeStatus(event.target);
	}

	selectItemChangeStatus(target) {
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

	initAllElement() {
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

	showGroup(name,isShow) {
		this[name + "Group"].visible = isShow;
	}

	updateGroup(name){
		if(this[name + "IsInit"]){
			this[name + "InitGroup"]();
			this[name + "IsInit"] = false;
		}
	}

	vipInitGroup() {
		var group = new uiskins.ActivityVipGroup();
		this.vipGroup.addElement(group);
	}

	catInitGroup() {
		var group = new uiskins.ActivityCatGroup();
		this.catGroup.addElement(group);
	}

	newbagInitGroup() {
		var group = new uiskins.ActivityNewBagGroup();
		this.newbagGroup.addElement(group);
	}

	lifecardInitGroup() {
		var group = new uiskins.ActivityLifeCardGroup();
		this.lifecardGroup.addElement(group);
	}

	threeInitGroup() {
		var group = new uiskins.ActivityThree();
		this.threeGroup.addElement(group);
	}

	monthInitGroup() {
		var group = new uiskins.ActivityMonth();
		this.monthGroup.addElement(group);
	}

	eggInitGroup() {
		var group = new uiskins.ActivityEggGroup();
		this.eggGroup.addElement(group);
	}

	accuInitGroup() {
		var group = new uiskins.ActivityAccuGroup();
		this.accuGroup.addElement(group);
	}

	blackInitGroup() {
		var group = new uiskins.ActivityWorthGroup();  //todoyby
		this.blackGroup.addElement(group);
	}

	costdiamondInitGroup() {
		var group = new uiskins.ActivityCostDiamondGroup();
		this.costdiamondGroup.addElement(group);
	}

	growth_fundInitGroup() {
		var group = new uiskins.ActivityGrowthFund();
		this.growth_fundGroup.addElement(group);
	}

	worthBoxInitGroup() {
		var group = new uiskins.ActivityWorthBox();
		this.worthBoxGroup.addElement(group);
	}	

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
