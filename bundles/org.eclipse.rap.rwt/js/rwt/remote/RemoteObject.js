/*******************************************************************************
 * Copyright (c) 2012, 2013 EclipseSource and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    EclipseSource - initial API and implementation
 ******************************************************************************/

(function(){

var server = rwt.remote.Server.getInstance();

/**
 * @private
 * @class Instances of RemoteObject represent the server-side counterpart of a client object
 * and are used to write operations into the next protocol message.
 * @description This constructor is not available in the global namespace. Instances can only
 * be obtained from {@link rap.getRemoteObject}.
 * @exports rwt.remote.RemoteObject as RemoteObject
 * @since 2.0
 * @param {}
 *
 */
rwt.remote.RemoteObject = function( id ) {
  this._ = {
    "id" : id,
    "listen" : {}
  };
};

rwt.remote.RemoteObject.prototype = {

  /**
   * @description Sets the specified property of the remote object to the given value.
   * Calling this method multiple times for the same property will overwrite the previous value,
   * the message will not become longer.
   * This method does not cause the message to be sent immediately.
   * @param {string} property The name of the property.
   * @param {var} value The value of the property.
   */
  set : function( key, value ) {
    server.getMessageWriter().appendSet( this._.id, key, value );
  },

  /**
   * @description Notifies the remote object that an event of the given type occurred.
   * Sending an event of a type the server is currently not
   * listening for (see {@link rap.registerTypeHandler}, <b>handler.listeners</b>) is illegal usage
   * of the RAP protocol, but currently not prevented. Calling this method causes the message to be
   * sent to the server within a few milliseconds.
   * @param {string} event The type of the event that occured.
   * @param {Object|null} [properties] This object may contain any number of additional
   * properties/fields associated with the event. It may also be null or omitted.
   */
  notify : function( event, properties ) {
    var suppressSend = arguments[ 2 ];
   // TODO [tb]: suppressSend should be a temporary workaround for KeyEventSupport.js
    var actualProps = properties ? properties : {};
    server.getMessageWriter().appendNotify( this._.id, event, actualProps );
    if( suppressSend !== true ) {
      server.send();
    }
  },

  /**
   * @description Instructs the remote object to call the given method.
   * Calling this method causes the message to be sent to the server within a
   * few milliseconds.
   * @param {string} method The name of the method.
   * @param {Object|null} [properties] This object may contain any number of additional
   * properties/fields associated with the call. It may also be null or omitted.
   */
  call : function( method, properties ) {
    var actualProps = properties ? properties : {};
    server.getMessageWriter().appendCall( this._.id, method, actualProps );
    server.send();
  },

  isListening : function( type ) {
    return this._.listen[ type ] === true;
  }

};

}());