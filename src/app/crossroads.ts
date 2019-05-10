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
  position: {
    coordinates: InterfaceCoordinates,
    type: string;
  };
}
