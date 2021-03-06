import * as angular from 'angular';
import IRootScopeService = angular.IRootScopeService;
import ICompileService = angular.ICompileService;
export class ComponentTest<TController> {
  public element: ng.IAugmentedJQuery;
  public scope: ng.IScope;
  public isoScope: ng.IScope;
  public rawElement: any;
  private rootScope: ng.IScope;
  private compile: ng.ICompileService;

  constructor(private template: string) {
    angular.mock.inject(($rootScope: IRootScopeService, $compile: ICompileService) => {
      this.rootScope = $rootScope;
      this.compile = $compile;
    });
  }

  public createComponent(attributes: any): void {
    this.scope = this.rootScope.$new();
    for (var key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        this.scope[key] = attributes[key];
      }
    }
    this.element = this.compile(this.template)(this.scope);
    this.scope.$digest();
    this.isoScope = this.element.isolateScope();
    this.rawElement = this.element[0];
  }

  public eventFire (el: any, etype: any) {
    if (el.fireEvent) {
      (el.fireEvent('on' + etype));
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }

}
