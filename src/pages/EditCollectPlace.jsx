import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { CollectPlaceContext } from '../context/CollectPlaceContext';

function EditCollectPlace() {
  const { id } = useParams();
  const { getCollectPlaceById, updatePlace } = useContext(CollectPlaceContext);
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
    async function fetchPlaceData() {
      try {
        const placeData = await getCollectPlaceById(id);
        reset(placeData); // Inicializa o formulário com os dados do local de coleta
        // Aplica os valores para os campos com máscaras após o reset
        setTimeout(() => {
          setValue('zipCode', placeData.zipCode, { shouldValidate: true });
        }, 50);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados do local de coleta:', error);
        setLoading(false);
      }
    }

    fetchPlaceData();
  }, [id, reset, setValue, getCollectPlaceById]);

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

  const onSubmit = async (data) => {
    try {
      await updatePlace(id, data);
      alert('Local de coleta atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar local de coleta');
      console.error('Erro ao atualizar local de coleta:', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h3>editar local de coleta</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='text'
          placeholder='Nome do ponto de coleta'
          {...register('place', {
            required: 'Informe o nome do local de coleta',
          })}
        />
        {errors.place && <p>{errors.place.message}</p>}

        <select
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
          <option value='Remédios ou blisters3'>Remédios ou blisters</option>
          <option value='Resíduos Verdes(podas)'>Resíduos Verdes(podas)</option>
          <option value='Resíduos Volumosos'>Resíduos Volumosos</option>
          <option value='Vidros'>Vidros</option>
        </select>
        {/* Exibir erro se o campo não for preenchido */}
        {errors.collect && <p>{errors.collect.message}</p>}
        <textarea
          placeholder='Descrição do local'
          {...register('placeDescription', { required: 'Descreva o local' })}
        />
        {errors.placeDescription && <p>{errors.placeDescription.message}</p>}

        <InputMask
          mask='99999-999'
          placeholder='CEP'
          maskChar={null}
          {...register('zipCode', {
            required: 'CEP é obrigatório',
            pattern: /^\d{5}-\d{3}$/,
            onBlur: () => {
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
        {errors.street && <p>{errors.street.message}</p>}
        <input
          type='text'
          placeholder='Número'
          {...register('number', { required: 'Número é obrigatório' })}
        />
        {errors.number && <p>{errors.number.message}</p>}
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
        {errors.neighborhood && <p>{errors.neighborhood.message}</p>}
        <input
          type='text'
          placeholder='Cidade'
          {...register('city', { required: 'Cidade é obrigatória' })}
        />
        {errors.city && <p>{errors.city.message}</p>}
        <input
          type='text'
          placeholder='Estado'
          {...register('state', { required: 'Estado é obrigatório' })}
        />
        {errors.state && <p>{errors.state.message}</p>}
        <input
          type='text'
          placeholder='Latitude'
          {...register('latitude', {
            required:
              'Latitude é obrigatória. Use o google maps para encontrar',
          })}
        />
        {errors.latitude && <p>{errors.latitude.message}</p>}
        <input
          type='text'
          placeholder='Longitude'
          {...register('longitude', {
            required:
              'Longitude é obrigatória. Use o google maps para encontrar',
          })}
        />
        {errors.longitude && <p>{errors.longitude.message}</p>}

        <button type='submit'>Atualizar</button>
      </form>
    </div>
  );
}
export default EditCollectPlace;
