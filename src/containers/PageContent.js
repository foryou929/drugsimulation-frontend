import Header from "./Header"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import routes from '../routes'
import { Suspense, lazy } from 'react'
import SuspenseContent from "./SuspenseContent"
import { useSelector } from 'react-redux'
import { useState, useEffect, useRef } from "react"
import { ConfigProvider, theme } from "antd";

const Page404 = lazy(() => import('../pages/protected/404'))

function PageContent() {
    const mainContentRef = useRef(null);
    const { pageTitle } = useSelector(state => state.header)

    const [app_theme, setAppTheme] = useState(localStorage.getItem('theme'))
    const [ant_theme, setAntTheme] = useState({})

    useEffect(() => {
        if (app_theme == 'light')
            setAntTheme(
                {
                    token: {
                        colorPrimary: '#7480FF',
                    }
                }
            )
        if (app_theme == 'dark') {
            setAntTheme({
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#7480FF',
                    colorBgBase: '#191E24',
                }
            })
        }
    }, [app_theme])

    // Scroll back to top on new page load
    useEffect(() => {
        mainContentRef.current.scroll({
            top: 0,
            behavior: "smooth"
        });
    }, [pageTitle])

    return (
        < ConfigProvider
            theme={ant_theme}
        >
            <div className="drawer-content flex flex-col ">
                <Header onChangeTheme={setAppTheme} />
                <main className="flex-1 overflow-y-auto md:pt-4 pt-4 px-6  bg-base-200" ref={mainContentRef}>
                    <Suspense fallback={<SuspenseContent />}>
                        <Routes>
                            {
                                routes.map((route, key) => {
                                    return (
                                        <Route
                                            key={key}
                                            exact={true}
                                            path={`${route.path}`}
                                            element={<route.component />}
                                        />
                                    )
                                })
                            }

                            {/* Redirecting unknown url to 404 page */}
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                    <div className="h-16"></div>
                </main>
            </div>
        </ConfigProvider>
    )
}


export default PageContent
