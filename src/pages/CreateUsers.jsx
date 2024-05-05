import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { UsersContext } from '../context/UsersContext';
import { Link } from 'react-router-dom';
import logo from '../assets/destinoCerto.png';
import Footer from '../components/Footer';
import { FaUserPlus } from 'react-icons/fa';
import { RiCakeFill } from 'react-icons/ri';
import { BsFillHouseFill } from 'react-icons/bs';
import { FaLock } from 'react-icons/fa6';
import { MdAlternateEmail } from 'react-icons/md';

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
  };

  return (
    <div className='main'>
      <div className='container'>
        <div className='header-container'>
          <div className='logo-container'>
            <Link to='/'>
              {' '}
              <img src={logo} className='logo' alt='Destino certo' />{' '}
            </Link>
          </div>
        </div>
        <div className='page-title'>
          <FaUserPlus /> <span>Se cadatra Mó Quiridu!</span>
        </div>
        <div className='container-form'>
          <div className='card-form'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='align-icon'>
                <FaUserPlus /> <span>Informações pessoais</span>
              </div>
              <input
                type='text'
                className={errors.name ? 'input-error' : ''}
                placeholder='Nome completo'
                {...register('name', { required: 'Insira seu nome' })}
              />
              {errors.name && (
                <small className='error-message'>{errors.name.message}</small>
              )}
              {/* Radio buttons para gênero */}
              <label className={errors.gender ? 'input-error' : ''}>
                <input
                  {...register('gender', { required: 'Gênero é obrigatório' })}
                  type='radio'
                  value='M'
                />{' '}
                M{' '}
              </label>
              <label className={errors.gender ? 'input-error' : ''}>
                <input
                  {...register('gender', { required: 'Gênero é obrigatório' })}
                  type='radio'
                  value='F'
                />{' '}
                F{' '}
              </label>
              <label className={errors.gender ? 'input-error' : ''}>
                <input
                  {...register('gender', { required: 'Gênero é obrigatório' })}
                  type='radio'
                  value='NI'
                />{' '}
                Não informado{' '}
              </label>
              {errors.gender && (
                <small className='error-message'>{errors.gender.message}</small>
              )}

              <InputMask
                mask='999.999.999-99'
                placeholder='CPF'
                maskChar={null}
                {...register('cpf', {
                  required: 'CPF é obrigatório',
                  pattern: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
                })}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type='text'
                    className={errors.cpf ? 'input-error' : ''}
                  />
                )}
              </InputMask>
              {errors.cpf && (
                <small className='error-message'>{errors.cpf.message}</small>
              )}
              <div className='align-icon'>
                <RiCakeFill />{' '}
                <span>Seu níver é antes da safra da tainha?</span>
              </div>
              <input
                type='date'
                className={errors.birthDate ? 'input-error' : ''}
                {...register('birthDate', {
                  required: 'Data de nascimento é obrigatória',
                })}
              />
              {errors.birthDate && (
                <small className='error-message'>
                  {errors.birthDate.message}
                </small>
              )}

              <div className='align-icon'>
                <BsFillHouseFill /> <span>Onde fica seu rancho?</span>
              </div>
              <InputMask
                mask='99999-999'
                placeholder='CEP'
                maskChar={null}
                {...register('zipCode', {
                  required: 'CEP é obrigatório',
                  pattern: /^\d{5}-\d{3}$/,
                })}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type='text'
                    className={errors.zipCode ? 'input-error' : ''}
                  />
                )}
              </InputMask>
              {errors.zipCode && (
                <small className='error-message'>
                  {errors.zipCode.message}
                </small>
              )}

              <input
                type='text'
                className={errors.street ? 'input-error' : ''}
                placeholder='Rua'
                {...register('street', { required: 'Rua é obrigatória' })}
              />
              {errors.street && (
                <small className='error-message'>{errors.street.message}</small>
              )}

              <input
                type='text'
                className={errors.number ? 'input-error' : ''}
                placeholder='Número'
                {...register('number', {
                  required: 'Número é obrigatório',
                })}
              />
              {errors.number && (
                <small className='error-message'>{errors.number.message}</small>
              )}

              <input
                type='text'
                placeholder='Complemento'
                {...register('complement')}
              />

              <input
                type='text'
                className={errors.neighborhood ? 'input-error' : ''}
                placeholder='Bairro'
                {...register('neighborhood', {
                  required: 'Bairro é obrigatório',
                })}
              />
              {errors.neighborhood && (
                <small className='error-message'>
                  {errors.neighborhood.message}
                </small>
              )}

              <input
                type='text'
                className={errors.city ? 'input-error' : ''}
                placeholder='Cidade'
                {...register('city', { required: 'Cidade é obrigatória' })}
              />
              {errors.city && (
                <small className='error-message'>{errors.city.message}</small>
              )}

              <input
                type='text'
                className={errors.state ? 'input-error' : ''}
                placeholder='Estado'
                {...register('state', { required: 'Estado é obrigatório' })}
              />
              {errors.state && (
                <small className='error-message'>{errors.state.message}</small>
              )}

              <div className='align-icon'>
                <MdAlternateEmail />{' '}
                <span>Dázumbanho! E usa teu melhor e-mail.</span>
              </div>
              <input
                type='email'
                className={errors.email ? 'input-error' : ''}
                placeholder='E-mail'
                {...register('email', { required: 'E-mail é obrigatório' })}
              />
              {errors.email && (
                <small className='error-message'>{errors.email.message}</small>
              )}
              <div className='align-icon'>
                <FaLock /> <span>Não seja ixtepô, capricha na senha!</span>
              </div>
              <input
                type='password'
                className={errors.password ? 'input-error' : ''}
                placeholder='Senha'
                {...register('password', {
                  required: 'Senha é obrigatória',
                  minLength: 6,
                  message: 'A senha deve ter pelo menos 6 caracteres',
                })}
              />
              {errors.password && (
                <small className='error-message'>
                  {errors.password.message}
                </small>
              )}

              <input
                type='password'
                className={errors.confirmPassword ? 'input-error' : ''}
                placeholder='Confirmar senha'
                {...register('confirmPassword', {
                  required: 'Confirmação de senha é obrigatória',
                  minLength: 6,
                  message: 'A senha deve ter pelo menos 6 caracteres',
                })}
              />
              {errors.confirmPassword && (
                <small className='error-message'>
                  {errors.confirmPassword.message}
                </small>
              )}

              <button type='submit'>Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateUsers;
