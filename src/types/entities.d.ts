

declare module Entities {

  export namespace Roles {

    type VolvanRole = typeof import('../entities/volovanRole').VolovanRole

    interface RoleData {
      id?: string;
      name?: string;
      description?: string;
      dynamicRoutes?: Object;

      createdOn?: number;
      createdBy?: string;
      modifiedOn?: number;
      modifiedBy?: string;
      deleted?: boolean;
    }

  }

  export namespace Users {
    type VolovanUser = typeof import('../entities/volovanUser').VolovanUser

    interface UserData {
      id?: string;
      name?: string;
      email?: string;
      password?: string;
      roles?: string[];

      createdOn?: number;
      createdBy?: string;
      modifiedOn?: number;
      modifiedBy?: string;
      deleted?: boolean;
    }
  }

  export namespace Persons {
    type VolvoanPerson = typeof import('../entities/volovanPerson').VolovanPerson

    interface PersonData {
      id?: string;
      firstNames?: string;
      lastNames?: string;
      phone?: string;
      email?: string;
      address?: string;

      createdOn?: number;
      createdBy?: string;
      modifiedOn?: number;
      modifiedBy?: string;
      deleted?: boolean;
    }
  }

  export namespace Participants {
    type VolovanParticipant = typeof import('../entities/volovanParticipant').VolovanParticipant

    interface ParticipantData {
      id?: string;
      name?: string;
      type?: string;
      images?: ParticipantImage[];
      docs?: ParticipantFile[];
      description?: string;
      persons?: string[];
      socialMedia?: SocialMedia[];



      createdOn?: number;
      createdBy?: string;
      modifiedOn?: number;
      modifiedBy?: string;
      deleted?: boolean;
    }

    interface ParticipantImage {
      name?: string;
      uri?: string;
      backgorund?: string;
    }

    interface ParticipantFile {
      name?: string;
      description?: string;
      uri?: string;
    }

    interface SocialMedia {
      name?: string;
      description?: string;
      uri?: string;
    }
  }

  export namespace Events {
    type VolovanEvent = typeof import('../entities/volovanEvent').VolovanEvent

    interface EventData {
      id?: string;
      name?: string;
      description?: string;
      dateTimes?: number[];
      participants?: string[];
      tickets?: string[];


      images?: EventImage[];
      docs?: EventFile[];
      route?: string;
      location?: string;
      mainImage?: string,

      createdOn?: number;
      createdBy?: string;
      modifiedOn?: number;
      modifiedBy?: string;
      deleted?: boolean;
    }
    interface EventImage {
      name?: string;
      uri?: string;
    }

    interface EventFile {
      name?: string;
      description?: string;
      uri?: string;
    }
  }

  export namespace Tickets {
    type VolovanTicket = typeof import('../entities/volovanTicket').VolovanTicket

    interface TicketData {
      id?: string;
      event?: string;
      person?: string;
      participant?: string;
      dateTimes?: number[];

      active?: boolean;
      isInEvent?: boolean;

      scans?: ScanData[]
      secret?: string

      createdOn?: number;
      createdBy?: string;
      modifiedOn?: number;
      modifiedBy?: string;
      deleted?: boolean;
    }

    interface ScanData {
      type?: string;
      datetime?: number;
      scanedBy?: string;
    }
  }



  export namespace Auth {
    interface LoginData {
      email?: string;
      password?: string;
    }

    interface TokenData {
      id?: string;
      token?: string;
    }

  }
}
