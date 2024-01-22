import React, { Suspense, useEffect } from "react"
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import MainLayout from './component/layout/MainLayout/MainLayout';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import RegAdmin from './pages/RegAdmin/RegAdmin';
import { useAppDispatch } from './service/redux/hooks/hooks';
import { getMe } from './service/redux/Slices/auth/slice';
import RequireAuth from './component/hoc/RequireAuth';
import ToastContainer from './component/Toast/ToastContainer';

import './App.scss'

//Lazy loading
const RegUserPage = React.lazy(() => import('./pages/RegUser/RegUser'))
const LogUserPage = React.lazy(() => import('./pages/AuthUser/AuthUser'))
const CabinetUserPage = React.lazy(() => import('./pages/Cabinet/Cabinet'))
const UserInfo = React.lazy(() => import('./pages/Cabinet/UserInfo/UserInfo'))
const AddBouquet = React.lazy(() => import('./pages/Cabinet/AddBouquet/AddBouquet'))
const CardBouquet = React.lazy(() => import('./component/CardBouquet/CardBouquet'))
const AddPresent = React.lazy(() => import('./pages/Cabinet/AddPresent/AddPresent'))

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<MainLayout />}>
    <Route path='' element={
      <Suspense fallback={
        <p>Loading ...</p>
      }>
        <Home />
      </Suspense>
    } />
    <Route path='regadmin' element={
      <Suspense fallback={
        <p>Loading ...</p>
      }>
        <RegAdmin />
      </Suspense>
    } />
    <Route path='user/register' element={
      <Suspense fallback={
        <p>Loading ...</p>
      }>
        <RegUserPage />
      </Suspense>
    } />
    <Route path='user/login' element={
      <Suspense fallback={
        <p>Loading ...</p>
      }>
        <LogUserPage />
      </Suspense>
    } />
    <Route path='user' element={
      <Suspense fallback={
        <p>Loading ...</p>
      }>
        <RequireAuth>
          <CabinetUserPage />
        </RequireAuth>
      </Suspense>
    } >
      <Route path='info' element={
        <Suspense fallback={
          <p>Loading...</p>
        }>
          <UserInfo />
        </Suspense>
      } />
      <Route path='addbouquet' element={
        <Suspense fallback={
          <p>Loading...</p>
        }>
          <AddBouquet />
        </Suspense>
      } />
      <Route path='addpresent' element={
        <Suspense fallback={
          <p>Loading...</p>
        }>
          <AddPresent />
        </Suspense>
      } />

    </Route>
    <Route path='bouquet/:id' element={
      <Suspense fallback={
        <p>Loading ...</p>
      }>
        < CardBouquet />
      </Suspense>
    } />

    <Route path='*' element={
      <Suspense fallback={
        <p>Loading ...</p>
      }>
        <NotFound />
      </Suspense>
    } />
  </Route>
))

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [])
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
