import { createRef } from 'react'
import {
  NavLink,
  useLocation,
  useOutlet,
} from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { Layout, Menu } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'

import Home from '../home/Home'
import Forecast from '../forecast/Forecast'
import Holidays from '../holidays/Holidays'
import NewsArticles from '../news/NewsArticles'
import Library from '../library/Library'
import UploadFile from '../uploadFile/UploadFile'
import Maps from '../map/Maps'
import Converter from '../converter/Converter'

import './styles.css'

// не использую styles.module.css, так как с ним CSSTransition не работает

export const routes = [
  { path: '/', name: 'Home', nodeRef: createRef(), element: <Home /> },
  { path: '/forecast', name: 'Forecast', nodeRef: createRef(), element: <Forecast /> },
  { path: '/holidays', name: 'Holidays', nodeRef: createRef(), element: <Holidays /> },
  { path: '/news', name: 'News', nodeRef: createRef(), element: <NewsArticles /> },
  { path: '/library', name: 'Library', nodeRef: createRef(), element: <Library /> },
  { path: '/upload', name: 'Upload', nodeRef: createRef(), element: <UploadFile /> },
  { path: '/converter', name: 'Converter', nodeRef: createRef(), element: <Converter /> },
  { path: '/maps', name: 'Maps', nodeRef: createRef(), element: <Maps /> },
]

export default function App () {
  const location = useLocation()
  const currentOutlet = useOutlet()
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {}

  return (
    <Layout>
      <Header>
        <Menu
          mode='horizontal'
          theme='dark'
          items={routes.map((route) => ({
            key: route.path,
            label: (<NavLink
              to={route.path}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              key={route.path}
              end
            >{route.name}</NavLink>),
          }))}></Menu>
      </Header>
      <Content className='container'>
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={200}
            classNames='page'
            unmountOnExit
          >
            {(state) => (
              <div ref={nodeRef} className='page'>
                {currentOutlet}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </Content>
      <Footer></Footer>
    </Layout>
  )
}
