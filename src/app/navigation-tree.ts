import {Crossroads as InterfaceCrossroads} from './crossroads';

export interface NavigationTree {
  title: string;
  slug: string;
  active: boolean;
  open: boolean;
  items: InterfaceCrossroads[];
}
