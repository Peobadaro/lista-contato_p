import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removerContato, editarContato } from '../store/contatosSlice'

const ListaDeContatos = () => {
  const contatos = useSelector((state: any) => state.contatos.contatos)
  const dispatch = useDispatch()

  const handleRemover = (id: number) => {
    dispatch(removerContato(id))
  }

  const handleEditar = (contato: any) => {
    const novoNome = prompt('Novo nome:', contato.nome)
    const novoEmail = prompt('Novo e-mail:', contato.email)
    const novoTelefone = prompt('Novo telefone:', contato.telefone)

    if (novoNome && novoEmail && novoTelefone) {
      dispatch(editarContato({ ...contato, nome: novoNome, email: novoEmail, telefone: novoTelefone }))
    }
  }

  return (
    <div>
      <h2>Lista de Contatos</h2>
      <ul>
        {contatos.map((contato: any) => (
          <li key={contato.id}>
            {contato.nome} - {contato.email} - {contato.telefone}
            <button onClick={() => handleEditar(contato)}>Editar</button>
            <button onClick={() => handleRemover(contato.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListaDeContatos
