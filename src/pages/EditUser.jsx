import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { UsersContext } from '../context/UsersContext';

function EditUser() {
  const { id } = useParams();
  const { getUserById, updateUser } = useContext(UsersContext);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUserById(id);
        reset(userData); // Inicializa o formulário com os dados do usuário
        // Aplica os valores para os campos com máscaras após o reset
        setTimeout(() => {
          setValue('cpf', userData.cpf, { shouldValidate: true });
          setValue('zipCode', userData.zipCode, { shouldValidate: true });
        }, 50);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        setLoading(false);
      }
    }

    fetchUserData();
  }, [id, reset, setValue, getUserById]);

  const cep = watch('zipCode');

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

  const onSubmit = async (data) => {
    try {
      await updateUser(id, data);
      alert('Usuário atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar usuário');
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='text'
          placeholder='Nome completo'
          {...register('name', { required: 'Nome completo é obrigatório' })}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          type='text'
          placeholder='E-mail'
          {...register('email', { required: 'E-mail é obrigatório' })}
        />
        {errors.email && <p>{errors.email.message}</p>}
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
            pattern: {
              value: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
              message: 'Formato de CPF inválido',
            },
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
        {errors.birthDate && <p>{errors.birthDate.message}</p>}
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
        <button type='submit'>Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditUser;
