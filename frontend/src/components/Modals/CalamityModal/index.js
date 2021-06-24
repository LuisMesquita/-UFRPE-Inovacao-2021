/* eslint-disable react/jsx-props-no-spreading */
// Global
import React from 'react'
import ClayButton from '@clayui/button'
import ClayCard from '@clayui/card'
import ClayForm, { ClayInput, ClaySelect } from '@clayui/form'
import ClayModal, { useModal } from '@clayui/modal'
import { useSelector, useDispatch } from 'react-redux'
import PropTyes from 'prop-types'
// Redux
import { useForm, Controller } from 'react-hook-form'
import { show } from '../../../redux/actions/calamityModal.action'
// Stylesheet
import './index.scss'
// Domains
import { CALAMITY_TYPES } from '../../../utils/domains/calamityTypes'
// Components
import ConditionalWrapper from '../../CondtionalWrapper'
import { getLatFromAddress } from '../../../api/geocode'
import { createCalamities } from '../../../api/calamities'

const { Footer, Header, Body } = ClayModal
const { Group } = ClayForm
const { Group: ClayInputGroup, GroupItem } = ClayInput
const { Body: BodyCard } = ClayCard

const ContentModal = ({ onClose, observer }) => {
  const options = [
    {
      label: 'Selecione',
      value: null,
    },
    ...CALAMITY_TYPES,
  ]

  const { register, handleSubmit, control } = useForm()
  const onSubmit = (data) => {
    const { type, ...address } = data
    getLatFromAddress(JSON.stringify(address)).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location
        createCalamities({
          type,
          latitude: lat,
          longitude: lng,
          city: address.locality,
        })
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      },
    )
  }

  return (
    <div>
      <ClayModal observer={observer} size='lg' status='info'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Header>Adicionar Calamidade</Header>
          <Body>
            <span>Endereço</span>
            <ClayCard>
              <BodyCard>
                <Group>
                  <ClayInputGroup>
                    <GroupItem>
                      <label htmlFor='postal_code'>CEP</label>
                      <ClayInput
                        onChange={() => {}}
                        {...register('postal_code', {
                          required: true,
                          pattern: /^\d{5}-\d{3}$/i,
                        })}
                        placeholder='00000-000'
                        type='text'
                      />
                    </GroupItem>
                  </ClayInputGroup>
                  <ClayInputGroup>
                    <GroupItem>
                      <label htmlFor='street_address'>Rua</label>
                      <ClayInput
                        {...register('street_address', { required: true })}
                        placeholder='Rua, Número'
                        type='text'
                      />
                    </GroupItem>
                  </ClayInputGroup>
                  <ClayInputGroup>
                    <GroupItem>
                      <label htmlFor='street_number'>Complemento</label>
                      <ClayInput
                        {...register('street_number', { required: true })}
                        placeholder='Complemento'
                        type='text'
                      />
                    </GroupItem>
                  </ClayInputGroup>
                  <ClayInputGroup>
                    <GroupItem>
                      <label htmlFor='administrative_area_level_1'>
                        Estado
                      </label>
                      <ClayInput
                        {...register('administrative_area_level_1', {
                          required: true,
                        })}
                        placeholder='Estado'
                        type='text'
                      />
                    </GroupItem>
                    <GroupItem>
                      <label htmlFor='locality'>Cidade</label>
                      <ClayInput
                        {...register('locality', { required: true })}
                        placeholder='Cidade'
                        type='text'
                      />
                    </GroupItem>
                    <GroupItem>
                      <label htmlFor='neighborhood'>Bairro</label>
                      <ClayInput
                        {...register('neighborhood', { required: true })}
                        placeholder='Bairro'
                        type='text'
                      />
                    </GroupItem>
                  </ClayInputGroup>
                </Group>
              </BodyCard>
            </ClayCard>
            <label htmlFor='basicInputText'>Tipo de Calamidade</label>
            <ClayCard>
              <BodyCard>
                <ClayInputGroup>
                  <GroupItem>
                    <label htmlFor='type'>Calamidade</label>
                    <Controller
                      name='type'
                      control={control}
                      required
                      render={({ field }) => (
                        <ClaySelect {...field}>
                          {options.map((item) => (
                            <ClaySelect.Option
                              key={item.value}
                              label={item.label}
                              value={item.value}
                            />
                          ))}
                        </ClaySelect>
                      )}
                    />
                  </GroupItem>
                </ClayInputGroup>
              </BodyCard>
            </ClayCard>
          </Body>
          <Footer
            first={
              <ClayButton onClick={onClose} displayType='secondary'>
                Cancelar
              </ClayButton>
            }
            last={
              <ClayButton type='submit' onClick={handleSubmit}>
                Adicionar
              </ClayButton>
            } // change to add function
          />
        </form>
      </ClayModal>
    </div>
  )
}

ContentModal.propTypes = {
  observer: PropTyes.instanceOf(Object).isRequired,
  onClose: PropTyes.func.isRequired,
}

const CalamityModal = () => {
  const { isOpened } = useSelector((state) => state.calamityModal)
  const dispatch = useDispatch()
  const open = (showParam) => dispatch(show(showParam))
  const { observer, onClose } = useModal({
    onClose: () => open(false),
  })

  return (
    <div className='calamity-modal'>
      <ConditionalWrapper condition={isOpened}>
        <ContentModal observer={observer} onClose={onClose} />
      </ConditionalWrapper>
      <ClayButton displayType='primary' onClick={() => open(true)}>
        Denunciar
      </ClayButton>
    </div>
  )
}

export default CalamityModal
