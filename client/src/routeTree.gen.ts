/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as ModelsIndexImport } from './routes/models/index'
import { Route as ModelsModelNameImport } from './routes/models/$modelName'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ModelsIndexRoute = ModelsIndexImport.update({
  path: '/models/',
  getParentRoute: () => rootRoute,
} as any)

const ModelsModelNameRoute = ModelsModelNameImport.update({
  path: '/models/$modelName',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/models/$modelName': {
      id: '/models/$modelName'
      path: '/models/$modelName'
      fullPath: '/models/$modelName'
      preLoaderRoute: typeof ModelsModelNameImport
      parentRoute: typeof rootRoute
    }
    '/models/': {
      id: '/models/'
      path: '/models'
      fullPath: '/models'
      preLoaderRoute: typeof ModelsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  ModelsModelNameRoute,
  ModelsIndexRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/models/$modelName",
        "/models/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/models/$modelName": {
      "filePath": "models/$modelName.tsx"
    },
    "/models/": {
      "filePath": "models/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
