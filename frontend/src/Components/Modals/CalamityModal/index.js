// Global
import React from 'react'
import ClayButton from '@clayui/button'
import ClayCard from '@clayui/card'
import ClayForm, { ClayInput, ClaySelect } from '@clayui/form'
import ClayModal, { useModal } from '@clayui/modal'
import { useSelector, useDispatch } from 'react-redux'
// Redux
import { show } from '../../../redux/actions/calamityModal.action'
// Stylesheet
import './index.scss'
// Domains
import { CALAMITY_TYPES } from '../../../utils/domains/calamityTypes'
// Components
const { Footer, Header, Body } = ClayModal
const { Group } = ClayForm
const { Group: ClayInputGroup, GroupItem } = ClayInput
const { Body: BodyCard } = ClayCard

const CalamityModal = () => {
  const { isOpened } = useSelector((state) => state.calamityModal)
  const dispatch = useDispatch()
  const open = (showParam) => dispatch(show(showParam))
  const { observer, onClose } = useModal({
    onClose: () => open(false),
  })
  const options = [
    {
      label: 'Selecione',
      value: null,
    },
    ...CALAMITY_TYPES,
  ]

  return (
    <div className='calamity-modal'>
      {isOpened && (
        <ClayModal observer={observer} size='lg' status='info'>
          <Header>Adicionar Calamidade</Header>
          <Body>
            <label htmlFor='basicInputText'>Endereço</label>
            <ClayCard>
              <BodyCard>
                <Group>
                  <ClayInputGroup>
                    <GroupItem>
                      <label htmlFor='basicInputText'>CEP</label>
                      <ClayInput
                        id='basicInputText'
                        placeholder='00000-000'
                        type='text'
                      />
                    </GroupItem>
                  </ClayInputGroup>
                  <ClayInputGroup>
                    <GroupItem>
                      <label htmlFor='basicInputText'>Rua</label>
                      <ClayInput
                        id='basicInputText'
                        placeholder='Rua, Número'
                        type='text'
                      />
                    </GroupItem>
                  </ClayInputGroup>
                  <ClayInputGroup>
                    <GroupItem>
                      <label htmlFor='basicInputText'>Complemento</label>
                      <ClayInput
                        id='basicInputText'
                        placeholder='Complemento'
                        type='text'
                      />
                    </GroupItem>
                  </ClayInputGroup>
                  <ClayInputGroup>
                    <GroupItem>
                      <label htmlFor='basicInputText'>Estado</label>
                      <ClayInput
                        id='basicInputText'
                        placeholder='Estado'
                        type='text'
                      />
                    </GroupItem>
                    <GroupItem>
                      <label htmlFor='basicInputText'>Cidade</label>
                      <ClayInput
                        id='basicInputText'
                        placeholder='Cidade'
                        type='text'
                      />
                    </GroupItem>
                    <GroupItem>
                      <label htmlFor='basicInputText'>Bairro</label>
                      <ClayInput
                        id='basicInputText'
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
                    <label htmlFor='Select Label'>Calamidade</label>
                    <ClaySelect aria-label='Select Label' id='mySelectId'>
                      {options.map((item) => (
                        <ClaySelect.Option
                          key={item.value}
                          label={item.label}
                          value={item.value}
                        />
                      ))}
                    </ClaySelect>
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
            last={<ClayButton onClick={onClose}>Adicionar</ClayButton>} // change to add function
          />
        </ClayModal>
      )}
      <ClayButton displayType='primary' onClick={() => open(true)}>
        Denunciar
      </ClayButton>
    </div>
  )
}

export default CalamityModal
