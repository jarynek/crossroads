interface InterfaceCoordinates {
  coordinates: object[];
}

export interface Crossroads {
  id: number;
  name: string;
  type: string;
  producer: string;
  managementUrl: string;
  operatingStatus: string;
  visible: boolean;
  active: boolean;
  hidden: boolean;
  meta: {
    control: string,
    light: string;
  },
  position: {
    coordinates: InterfaceCoordinates,
    type: string;
  };
}
