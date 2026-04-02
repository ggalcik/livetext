export type ILayout =  'portrait-wide' | "crampedPortrait" ;

export interface IGlobal {
    layout: Partial<Record<ILayout, boolean>>;
    activeLayout: ILayout;
}

export const gGlobal:IGlobal = {
    layout: {
       crampedPortrait: true
    },
    activeLayout: "crampedPortrait"
}