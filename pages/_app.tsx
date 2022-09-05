import Layout from 'components/Layout'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import 'styles/globals.css'

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default App
