///<reference path="../types/types.d.ts" />
import { bold } from 'colors';


export class Logger {
  public static env: string = 'development';
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public debug(message: string, variable?: any) {
    if (Logger.env === 'development')
      console.log(bold.yellow(`[${this.name}] `) + message, variable ? variable : '');
    else
      return;
  }

  public info(message: string, variable?: any) {
    if (Logger.env === 'development')
      console.log(bold.cyan(`[${this.name}] `) + message, variable ? variable : '');
    else
      return;
  }

  public error(message: string, variable?: any) {
    if (Logger.env === 'development')
      console.log(bold.red(`[${this.name}] `) + message, variable ? variable : '');
    else
      return;
  }
}