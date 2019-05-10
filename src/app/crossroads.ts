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
  position: {
    coordinates: InterfaceCoordinates,
    type: string;
  };
}
