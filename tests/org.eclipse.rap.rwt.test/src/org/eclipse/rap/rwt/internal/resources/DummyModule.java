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
package org.eclipse.rap.rwt.internal.resources;

public class DummyModule implements JavaScriptModule {

  public String getDirectory() {
    return "org/eclipse/rap/rwt/internal/resources";
  }

  public String[] getFileNames() {
    return JavaScriptLoaderImpl_Test.files;
  }

  public ClassLoader getLoader() {
    return JavaScriptLoaderImpl_Test.class.getClassLoader();
  }

}
