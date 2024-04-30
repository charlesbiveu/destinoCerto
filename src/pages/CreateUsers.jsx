import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { UsersContext } from '../context/UsersContext';

function CreateUsers() {
  const { createUser } = useContext(UsersContext);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const cep = watch('zipCode');
  const password = watch('password');

  useEffect(() => {
    if (cep && cep.length === 9) {
      // CEP completo com máscara
      fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.erro) {
            setValue('street', data.logradouro);
            setValue('complement', data.complemento);
            setValue('neighborhood', data.bairro);
            setValue('city', data.localidade);
            setValue('state', data.uf);
          } else {
            alert('CEP não encontrado.');
          }
        })
        .catch((error) => console.error('Erro ao buscar CEP', error));
    }
  }, [cep, setValue]);

  const onSubmit = (data) => {
    if (data.password !== data['confirm-password']) {
      alert('Senhas não conferem');
      return;
    }
    createUser(data);
  };

  return (
    <>
      <h3>Users</h3>
      <div>Form de cadastro de usuários</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='text'
          placeholder='Nome completo'
          {...register('name', { required: 'Insira seu nome' })}
        />
        <input
          type='text'
          placeholder='Email'
          {...register('email', { required: 'Email é obrigatório' })}
        />
        <label>
          <input
            {...register('gender', { required: 'Gênero é obrigatório' })}
            type='radio'
            value='M'
          />{' '}
          Masculino
        </label>
        <label>
          <input
            {...register('gender', { required: 'Gênero é obrigatório' })}
            type='radio'
            value='F'
          />{' '}
          Feminino
        </label>
        <label>
          <input
            {...register('gender', { required: 'Gênero é obrigatório' })}
            type='radio'
            value='NI'
          />{' '}
          Não Informado
        </label>
        <InputMask
          mask='999.999.999-99'
          placeholder='CPF'
          maskChar={null}
          {...register('cpf', {
            required: 'CPF é obrigatório',
            pattern: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
          })}
        >
          {(inputProps) => <input {...inputProps} type='text' />}
        </InputMask>
        {errors.cpf && <p>{errors.cpf.message}</p>}
        <input
          type='date'
          {...register('birthDate', {
            required: 'Data de nascimento é obrigatória',
          })}
        />
        <input
          type='password'
          placeholder='Senha'
          {...register('password', {
            required: 'Senha é obrigatória',
            minLength: 8,
          })}
        />
        <input
          type='password'
          placeholder='Confirmar senha'
          {...register('confirm-password', {
            required: 'Confirmação de senha é obrigatória',
            minLength: 8,
          })}
        />
        <InputMask
          mask='99999-999'
          placeholder='CEP'
          maskChar={null}
          {...register('zipCode', {
            required: 'CEP é obrigatório',
            pattern: /^\d{5}-\d{3}$/,
            onBlur: (event) => {
              const cep = getValues('zipCode');
              if (cep && cep.length === 9) fetchCEP(cep);
            },
          })}
        >
          {(inputProps) => <input {...inputProps} type='text' />}
        </InputMask>
        {errors.zipCode && <p>{errors.zipCode.message}</p>}
        <input
          type='text'
          placeholder='Rua'
          {...register('street', { required: 'Rua é obrigatória' })}
        />
        <input
          type='text'
          placeholder='Número'
          {...register('number', { required: 'Número é obrigatório' })}
        />
        <input
          type='text'
          placeholder='Complemento'
          {...register('complement')}
        />
        <input
          type='text'
          placeholder='Bairro'
          {...register('neighborhood', { required: 'Bairro é obrigatório' })}
        />
        <input
          type='text'
          placeholder='Cidade'
          {...register('city', { required: 'Cidade é obrigatória' })}
        />
        <input
          type='text'
          placeholder='Estado'
          {...register('state', { required: 'Estado é obrigatório' })}
        />
        <label>
          <input type='checkbox' {...register('admin')} /> Admin
        </label>
        <button type='submit'>Cadastrar</button>
      </form>
    </>
  );
}

export default CreateUsers;
