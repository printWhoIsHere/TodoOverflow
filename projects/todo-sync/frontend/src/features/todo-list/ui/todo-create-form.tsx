import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from 'lucide-react'

import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/shared/ui/form'

import { useTaskCreate } from '../model/use-task-create'

const formSchema = z.object({
	text: z.string().min(1),
})

export function TodoCreateForm() {
	const { create, loading } = useTaskCreate()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			text: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			create(values)
			form.reset()
		} catch (error) {
			console.log('Create task failed', error)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='w-full flex items-center gap-2'
			>
				<FormField
					control={form.control}
					name='text'
					render={({ field }) => (
						<FormItem className='flex-1'>
							<FormControl>
								<Input
									{...field}
									type='text'
									placeholder='Добавить задачу...'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button
					variant='ghost'
					size='sm'
					type='submit'
					className='px-3 text-muted-foreground hover:scale-105'
					disabled={loading}
				>
					{loading ? <></> : <PlusIcon className='w-4 h-4' />}
				</Button>
			</form>
		</Form>
	)
}
