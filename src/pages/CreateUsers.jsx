import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import logo from '../assets/destinoCerto.png';

function CreateUsers() {
  const { createUser } = useContext(UsersContext);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      admin: false,
    },
  });
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
    if (data.password !== data['confirmPassword']) {
      alert('Senhas não conferem');
      return;
    }
    defaultValues: {
      admin: false;
    }
    createUser(data);
    reset();
  };

  return (
    <>
      <img src={logo} className='logo' alt='Destino certo' />
      <h3>Novo Usuário</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <div>
            <strong>Informações pessoais</strong>
          </div>
          <div className='form-group-itens'>
            <input
              type='text'
              placeholder='Nome completo'
              {...register('name', { required: 'Insira seu nome' })}
            />
            {errors.name && (
              <small className='error'>{errors.name.message}</small>
            )}
          </div>
          <div className='form-group-itens'>
            <label>
              <input
                {...register('gender', { required: 'Gênero é obrigatório' })}
                type='radio'
                value='M'
              />{' '}
              M
            </label>
            <label>
              <input
                {...register('gender', { required: 'Gênero é obrigatório' })}
                type='radio'
                value='F'
              />{' '}
              F
            </label>
            <label>
              <input
                {...register('gender', { required: 'Gênero é obrigatório' })}
                type='radio'
                value='NI'
              />{' '}
              Não informado
            </label>
            {errors.gender && (
              <small className='error'>{errors.gender.message}</small>
            )}
          </div>
          <div className='form-group-itens'>
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
            {errors.cpf && (
              <small className='error'>{errors.cpf.message}</small>
            )}
          </div>
          <div className='form-group-itens'>
            <div>
              <input
                type='date'
                {...register('birthDate', {
                  required: 'Data de nascimento é obrigatória',
                })}
              />
            </div>
            {errors.birthDate && (
              <small className='error'>{errors.birthDate.message}</small>
            )}
          </div>
          <div>
            <strong>Endereço</strong>
          </div>
          <div className='form-group-itens'>
            <InputMask
              mask='99999-999'
              placeholder='CEP'
              maskChar={null}
              {...register('zipCode', {
                required: 'CEP é obrigatório',
                pattern: /^\d{5}-\d{3}$/,
              })}
            >
              {(inputProps) => <input {...inputProps} type='text' />}
            </InputMask>
            {errors.zipCode && (
              <small className='error'>{errors.zipCode.message}</small>
            )}
          </div>
          <div className='form-group-itens'>
            <input
              type='text'
              placeholder='Rua'
              {...register('street', { required: 'Rua é obrigatória' })}
            />
            {errors.street && (
              <small className='error'>{errors.street.message}</small>
            )}
          </div>
          <div className='form-group-itens'>
            <input
              type='text'
              placeholder='Número'
              {...register('number', { required: 'Número é obrigatório' })}
            />
            {errors.number && (
              <small className='error'>{errors.number.message}</small>
            )}
          </div>
          <div className='form-group-itens'>
            <input
              type='text'
              placeholder='Complemento'
              {...register('complement')}
            />
          </div>
          <div className='form-group-itens'>
            <input
              type='text'
              placeholder='Bairro'
              {...register('neighborhood', {
                required: 'Bairro é obrigatório',
              })}
            />
            {errors.neighborhood && (
              <small className='error'>{errors.neighborhood.message}</small>
            )}
          </div>
          <div className='form-group-itens'>
            <input
              type='text'
              placeholder='Cidade'
              {...register('city', { required: 'Cidade é obrigatória' })}
            />
            {errors.city && (
              <small className='error'>{errors.city.message}</small>
            )}
          </div>
          <div className='form-group-itens'>
            <input
              type='text'
              placeholder='Estado'
              {...register('state', { required: 'Estado é obrigatório' })}
            />
            {errors.state && (
              <small className='error'>{errors.state.message}</small>
            )}
          </div>
          <div>
            <strong>Informações de acesso</strong>
          </div>
          <div className='form-group-itens'>
            <input
              type='email'
              placeholder='E-mail'
              {...register('email', { required: 'E-mail é obrigatório' })}
            />
            {errors.email && (
              <small className='error'>{errors.email.message}</small>
            )}
          </div>
          <div className='form-group-itens'>
            <input
              type='password'
              placeholder='Senha'
              {...register('password', {
                required: 'Senha é obrigatória',
                minLength: 6,
                message: 'A senha deve ter pelo menos 6 caracteres',
              })}
            />
            {errors.confirmPassword && (
              <small className='error'>
                {errors.password.message ||
                  (errors.password.type === 'required'
                    ? 'Senha é obrigatória'
                    : errors.password.type === 'minLength'
                    ? 'A senha deve ter pelo menos 6 caracteres'
                    : '')}
              </small>
            )}
          </div>
          <div className='form-group-itens'>
            <input
              type='password'
              placeholder='Confirmar senha'
              {...register('confirmPassword', {
                required: 'Confirmação de senha é obrigatória',
                minLength: 6,
                message: 'A senha deve ter pelo menos 6 caracteres',
              })}
            />
            {errors.confirmPassword && (
              <small className='error'>
                {errors.confirmPassword.message ||
                  (errors.confirmPassword.type === 'required'
                    ? 'Confirmação de senha é obrigatória'
                    : errors.confirmPassword.type === 'minLength'
                    ? 'A senha deve ter pelo menos 6 caracteres'
                    : '')}
              </small>
            )}
          </div>
        </div>
        <button type='submit'>Cadastrar</button>
      </form>
    </>
  );
}

export default CreateUsers;
