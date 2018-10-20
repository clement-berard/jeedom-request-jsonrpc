export class apiJeedom {                  
    constructor(...args: any[]);          
                                          
    getCmdPrefix(...args: any[]): void;   
                                          
    run(...args: any[]): void;            
                                          
}                                         
                                          
export const scenarioStates: {            
    DISABLE: string;                      
    ENABLE: string;                       
    RUN: string;                          
    STOP: string;                         
};                                        