import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { CollectPlaceContext } from '../context/CollectPlaceContext';
import { useNavigate } from 'react-router-dom';
import { RiMapPinAddFill } from 'react-icons/ri';

function CreatePlaces() {
  let user_id = JSON.parse(localStorage.getItem('user_id'));
  const { createPlace } = useContext(CollectPlaceContext);
  const navigate = useNavigate();
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
      user_id: user_id, // aqui vanda user_id como default após recuperar do localStorage
      collect: '',
    },
  });

  const cep = watch('zipCode');

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
    defaultValues: {
      user_id: user_id;
    }
    createPlace(data);
    reset(); // limpa o formulário após enviar
    navigate('/collectPlaces/listbyuser/' + user_id);
  };

  return (
    <>
      <div className='page-title'>
        <RiMapPinAddFill /> <span>Cadastrar ponto de coleta</span>
      </div>
      <div className='container-form'>
        <div className='card-form'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type='text'
              className={errors.place ? 'input-error' : ''}
              placeholder='Nome do ponto de coleta'
              {...register('place', {
                required: 'Informe o nome do local de coleta',
              })}
            />
            {errors.place && (
              <small className='error-message'>{errors.place.message}</small>
            )}
            <select
              className={errors.collect ? 'input-error' : ''}
              {...register('collect', { required: 'Informe o tipo de coleta' })}
            >
              <option value=''> Tipo de Coleta</option>
              <option value='Animais Mortos'>Animais Mortos</option>
              <option value='Caixa de Gordura'>Caixa de Gordura</option>
              <option value='Cápsulas de café'>Cápsulas de café</option>
              <option value='Eletrônicos'>Eletrônicos</option>
              <option value='Lâmpadas'>Lâmpadas</option>
              <option value='Óleo de cozinha'>Óleo de cozinha</option>
              <option value='Perfurocortantes'>Perfurocortantes</option>
              <option value='Pilhas e baterias'>Pilhas e baterias</option>
              <option value='Plástico'>Plásticos</option>
              <option value='Remédios ou blisters3'>
                Remédios ou blisters
              </option>
              <option value='Resíduos Verdes(podas)'>
                Resíduos Verdes(podas)
              </option>
              <option value='Resíduos Volumosos'>Resíduos Volumosos</option>
              <option value='Vidros'>Vidros</option>
            </select>
            {/* Exibir erro se o campo não for preenchido */}
            {errors.collect && (
              <small className='error-message'>{errors.collect.message}</small>
            )}
            <textarea
              className={errors.placeDescription ? 'input-error' : ''}
              placeholder='Descrição do local'
              {...register('placeDescription', {
                required: 'Descreva o local',
              })}
            />
            {errors.placeDescription && (
              <small className='error-message'>
                {errors.placeDescription.message}
              </small>
            )}

            <InputMask
              className={errors.zipCode ? 'input-error' : ''}
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
              <small className='error-message'>{errors.zipCode.message}</small>
            )}
            <input
              className={errors.street ? 'input-error' : ''}
              type='text'
              placeholder='Rua'
              {...register('street', { required: 'Rua é obrigatória' })}
            />
            {errors.street && (
              <small className='error-message'>{errors.street.message}</small>
            )}
            <input
              className={errors.number ? 'input-error' : ''}
              type='text'
              placeholder='Número'
              {...register('number', { required: 'Número é obrigatório' })}
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
              className={errors.neighborhood ? 'input-error' : ''}
              type='text'
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
              className={errors.city ? 'input-error' : ''}
              type='text'
              placeholder='Cidade'
              {...register('city', { required: 'Cidade é obrigatória' })}
            />
            {errors.city && (
              <small className='error-message'>{errors.city.message}</small>
            )}
            <input
              className={errors.state ? 'input-error' : ''}
              type='text'
              placeholder='Estado'
              {...register('state', { required: 'Estado é obrigatório' })}
            />
            {errors.state && (
              <small className='error-message'>{errors.state.message}</small>
            )}
            <input
              className={errors.latitude ? 'input-error' : ''}
              type='text'
              placeholder='Latitude'
              {...register('latitude', {
                required:
                  'Latitude é obrigatória. Use o google maps para encontrar',
              })}
            />
            {errors.latitude && (
              <small className='error-message'>{errors.latitude.message}</small>
            )}
            <input
              className={errors.longitude ? 'input-error' : ''}
              type='text'
              placeholder='Longitude'
              {...register('longitude', {
                required:
                  'Longitude é obrigatória. Use o google maps para encontrar',
              })}
            />
            {errors.longitude && (
              <small className='error-message'>
                {errors.longitude.message}
              </small>
            )}

            <button type='submit'>Cadastrar</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePlaces;
