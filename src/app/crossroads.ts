interface InterfaceCoordinates {
  coordinates: object[];
}

export interface Crossroads {
  id: string;
  connectorId: string;
  name: string;
  class: string;
  type: string;
  producer: string;
  model: string;
  managementUrl: string;
  operatingStatus: string;
  systemStatus: string;
  visible: boolean;
  active: boolean;
  hidden: boolean;
  focus: boolean;
  meta: {
    control: string,
    light: string;
  };
  position: {
    coordinates: InterfaceCoordinates,
    type: string;
  };
}
