/*******************************************************************************
 * Copyright (c) 2012 EclipseSource and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    EclipseSource - initial API and implementation
 ******************************************************************************/

qx.Class.define( "org.eclipse.rwt.test.tests.JSExecutorTest", {

  extend : qx.core.Object,

  members : {

    testJSExecutorExists : function() {
      var objectManager = org.eclipse.rwt.protocol.ObjectManager;
      var externalBrowser = objectManager.getObject( "jsex" );
      assertTrue( externalBrowser instanceof org.eclipse.rwt.JSExecutor );
    },

    testCreateJSExecutorByProtocol : function() {
      var jsExecutor = org.eclipse.rwt.JSExecutor.getInstance();
      org.eclipse.rwt.protocol.Processor.processOperation( {
        "target" : "jsex",
        "action" : "create",
        "type" : "rwt.JSExecutor",
        "properties" : {}
      } );
      var objectManager = org.eclipse.rwt.protocol.ObjectManager;
      assertIdentical( jsExecutor, objectManager.getObject( "jsex" ) );
    },

    testExecuteByProtocol : function() {
      var objectManager = org.eclipse.rwt.protocol.ObjectManager;
      var uiCallBack = objectManager.getObject( "jsex" );
      org.eclipse.rwt.protocol.Processor.processOperation( {
        "target" : "jsex",
        "action" : "call",
        "method" : "execute",
        "properties" : {
          "content" : "window.foo = 33;"
        }
      } );
      assertEquals( 33, window.foo );
      delete window.foo;
    }

  }

} );