/**
 * Copyright 2020 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { JSHandle } from './JSHandle';

/**
 * @public
 */
export interface ConsoleMessageLocation {
  /**
   * URL of the resource if known or `undefined` otherwise.
   */
  url?: string;

  /**
   * 0-based line number in the resource if known or `undefined` otherwise.
   */
  lineNumber?: number;

  /**
   * 0-based column number in the resource if known or `undefined` otherwise.
   */
  columnNumber?: number;
}

// Prettier seems to struggle with the ConsoleMessageType declaration
// so it is switched off just for that block.
/* eslint-disable prettier/prettier */

/**
 * The supported types for console messages.
 */
export type ConsoleMessageType = 'log' | 'debug' | 'info' | 'error' | 'warning' |
    'dir' | 'dirxml' | 'table' | 'trace' | 'clear' | 'startGroup' |
    'startGroupCollapsed' | 'endGroup' | 'assert' | 'profile' |
    'profileEnd' | 'count' | 'timeEnd' | 'verbose';

/* eslint-enable prettier/prettier */

/**
 * ConsoleMessage objects are dispatched by page via the 'console' event.
 * @public
 */
export class ConsoleMessage {
  private _type: ConsoleMessageType;
  private _text: string;
  private _args: JSHandle[];
  private _location: ConsoleMessageLocation;

  /**
   * @public
   */
  constructor(
    type: ConsoleMessageType,
    text: string,
    args: JSHandle[],
    location: ConsoleMessageLocation = {}
  ) {
    this._type = type;
    this._text = text;
    this._args = args;
    this._location = location;
  }

  /**
   * @returns The type of the console message.
   */
  type(): ConsoleMessageType {
    return this._type;
  }

  /**
   * @returns The text of the console message.
   */
  text(): string {
    return this._text;
  }

  /**
   * @returns An array of arguments passed to the console.
   */
  args(): JSHandle[] {
    return this._args;
  }

  /**
   * @returns The location of the console message.
   */
  location(): ConsoleMessageLocation {
    return this._location;
  }
}