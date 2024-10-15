import { Pencil, Printer } from 'lucide-react';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';
import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { IMemorandum } from '@/api/queries/memorandums.query';
import UpdateMemorandumDialog from '@/components/dialogs/memorandum/edit';

interface Props {
	data: IMemorandum;
}

export default function MemorandumPreview({ data }: Props) {
	const contentRef = useRef<HTMLDivElement | null>(null);
	const reactToPrintFn = useReactToPrint({ contentRef });
	const [openEditMemo, setOpenEditMemo] = useState(false);

	return (
		<div className="w-[750px] bg-white rounded-lg">
			<div className='h-[50px] px-4 flex items-center justify-between'>
				<h1 className='text-[12px] text-black italic'>Memorandum preview</h1>
				<div className='flex flex-row items-center gap-x-2'>
					<Button onClick={() => setOpenEditMemo(true)} size={'sm'} className='gap-1'>
						<Pencil size={16} />
						<span>Edit</span>
					</Button>

					<Button onClick={() => reactToPrintFn()} size={'sm'} className='gap-1'>
						<Printer size={16} />
						<span>Print</span>
					</Button>
				</div>
			</div>
			<Separator />

			<div ref={contentRef} className='p-10 min-h-[900px] mb-4'>
				<div className='text-center text-black'>
					<h1 className='text-[14px] font-semibold'>
						Brgy. Maulong, Catbalogan City, Samar 6700
					</h1>
					<h3 className='text-[14px] font-semibold'>
						Tel. No.: 055-544-3360
					</h3>
					<div className='flex flex-col text-[14px]'>
						<span>Email: 6rmdbuilders@gmail.com</span>
					</div>
				</div>

				<Separator className='my-4' />

				<div className='p-2 text-black space-y-4 mb-20'>
					<div className='flex flex-wrap items-center gap-4'>
						<div className='w-full lg:w-auto flex items-end gap-1 text-[12px]'>
							<span className='leading-[16px] font-semibold'>
								MEMO {data.memorandumNumber}
							</span>
						</div>
					</div>

					<div>
						<div className='w-full lg:w-[200px] flex items-end gap-1 text-[12px]'>
							<span className='leading-[16px] font-semibold'>To:</span>
							<div className='flex-1 leading-[16px]'>
								<span>{data.to}</span>
							</div>
						</div>

						<div className='w-full lg:w-[200px] flex items-end gap-1 text-[12px]'>
							<span className='leading-[16px] font-semibold'>Re:</span>
							<div className='flex-1 leading-[16px]'>
								<span>{data.re}</span>
							</div>
						</div>
					</div>

					<p className='text-[12px]'>{data.addressee},</p>

					<div
						className="text-[12px] ml-16 space-y-2 list-disc list-inside"
						dangerouslySetInnerHTML={{ __html: data.contents }}
					/>
				</div>

				<div className='flex items-end justify-start gap-4 text-black mt-16'>
					<div className='w-full text-left max-w-[250px] text-[12px]'>
						<div className='flex flex-col'>
							<span className='leading-[16px]'>Sincerely Yours,</span>
							<div className='mt-4'>
								<span className='text-[12px] font-semibold'>Johann Estrada</span>
								<span className='block text-[12px]'>Construction Manager</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<UpdateMemorandumDialog
				openDialog={openEditMemo}
				setOpenDialog={setOpenEditMemo}
				memorandumData={data}
			/>
		</div>
	);
}
