import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useCreateMenuItem } from '@/features/admin/hooks/useMenuItemActions'
import { menuItemSchema, type MenuItemFormValues } from '@/features/admin/types/menu-item-schema'
import { menuCategories } from '@/features/menu/types/menu'
import { getApiErrorMessage } from '@/shared/lib/api-error'

const inputClassName =
  'rounded-none border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-white'

export function MenuItemForm() {
  const createItem = useCreateMenuItem()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MenuItemFormValues>({
    resolver: zodResolver(menuItemSchema),
  })

  const onSubmit = (values: MenuItemFormValues) => {
    createItem.mutate(values, {
      onSuccess: () => {
        reset()
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="item-title" className="font-medium">
          Nom du produit
        </label>
        <input id="item-title" type="text" className={inputClassName} {...register('title')} />
        {errors.title && <p className="text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="item-category" className="font-medium">
          Catégorie
        </label>
        <select id="item-category" defaultValue="" className={inputClassName} {...register('category')}>
          <option value="" disabled>
            Choisir une catégorie
          </option>
          {menuCategories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.label}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-sm text-red-600 dark:text-red-400">{errors.category.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="item-price" className="font-medium">
          Prix (€)
        </label>
        <input
          id="item-price"
          type="number"
          step="0.01"
          className={inputClassName}
          {...register('price', {
            setValueAs: (value: string) => (value === '' ? undefined : Number(value)),
          })}
        />
        {errors.price && <p className="text-sm text-red-600 dark:text-red-400">{errors.price.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="item-description" className="font-medium">
          Description
        </label>
        <textarea id="item-description" rows={6} className={inputClassName} {...register('description')} />
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Le texte accepte la mise en forme Markdown (gras, listes, titres).
        </p>
        {errors.description && <p className="text-sm text-red-600 dark:text-red-400">{errors.description.message}</p>}
      </div>

      {createItem.isError && (
        <p className="text-sm text-red-600 dark:text-red-400">{getApiErrorMessage(createItem.error)}</p>
      )}

      <button
        type="submit"
        disabled={createItem.isPending}
        className="flex items-center justify-center gap-2 rounded-none bg-bordeaux px-4 py-2 font-medium text-white hover:bg-vigne disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
      >
        {createItem.isPending ? (
          <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
        ) : (
          <Plus size={18} aria-hidden="true" />
        )}
        Ajouter le produit
      </button>
    </form>
  )
}
