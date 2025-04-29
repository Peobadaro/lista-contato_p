import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Contato = {
  id: number
  nome: string
  email: string
  telefone: string
}

type ContatosState = {
  contatos: Contato[]
}

const initialState: ContatosState = {
  contatos: []
}

const contatosSlice = createSlice({
  name: 'contatos',
  initialState,
  reducers: {
    adicionarContato: (state, action: PayloadAction<Contato>) => {
      state.contatos.push(action.payload)
    },
    removerContato: (state, action: PayloadAction<number>) => {
      state.contatos = state.contatos.filter(contato => contato.id !== action.payload)
    },
    editarContato: (state, action: PayloadAction<Contato>) => {
      const index = state.contatos.findIndex(contato => contato.id === action.payload.id)
      if (index !== -1) {
        state.contatos[index] = action.payload
      }
    }
  }
})

export const { adicionarContato, removerContato, editarContato } = contatosSlice.actions
export default contatosSlice.reducer
