import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import store from './store/store'
import ListaDeContatos from './components/ListaDeContatos'
import FormularioContato from './components/FormularioContato'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ListaDeContatos />} />
          <Route path="/adicionar-contato" element={<FormularioContato />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
