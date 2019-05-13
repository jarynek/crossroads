import {Crossroads as InterfaceRoads} from './crossroads';

export interface NavigationTree {
    title: string;
    slug: string;
    active: boolean;
    open: boolean;
    items: InterfaceRoads[];
}
