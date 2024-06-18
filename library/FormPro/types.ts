export interface FormProProps {
  items: ItemConfig[]
}

export interface ItemConfig {
  name: string,
  label: string,
  type: InputTypeMenu,
}

export type InputTypeMenu = 'select' | 'input' | 'textarea' | 'radio' | 'checkbox'
