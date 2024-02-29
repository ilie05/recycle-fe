import {useMemo, useState, useEffect} from 'react';
import {MaterialReactTable, useMaterialReactTable} from 'material-react-table';


const DSAtNode = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			const req = await fetch('http://localhost:5000/ds')
			const data = await req.json();
			setIsLoading(false);
			setData(data)
		}

		fetchData()
	}, [])

	const columnTotalsFn = (table, field) => Math.round((table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue(field), 0) + Number.EPSILON) * 100) / 100


	const columns = useMemo(
		() => [
			{
				accessorKey: 'week',
				header: 'Week',
				size: 130,
				filterVariant: 'range-slider',
				filterFn: 'betweenInclusive',
				muiFilterSliderProps: {
					min: 1,
					max: 52
				},
				Footer: () => <div><b>Total</b></div>,
			},
			{
				accessorKey: 'from_plant_id',
				header: 'From Plant ID',
				filterFn: 'includesString',
				size: 160,
				enableColumnFilter: true,
			},
			{
				accessorKey: 'to_plant_id',
				header: 'To Plant ID',
				size: 140,
				filterFn: 'includesString',
				enableColumnFilter: true,
			},
			{
				accessorKey: 'item_number',
				header: 'Item',
				size: 100,
				filterFn: 'includesString',
				enableColumnFilter: true,
			},
			{
				accessorKey: 'item_class',
				header: 'Item Class',
				size: 140,
				filterFn: 'includesString',
				enableColumnFilter: true,
			},
			{
				accessorKey: 'item_category',
				header: 'Item Category',
				size: 160,
				filterFn: 'includesString',
				enableColumnFilter: true,
			},
			{
				accessorKey: 'item_subcategory',
				header: 'Item Subcategory',
				size: 180,
				filterFn: 'includesString',
				enableColumnFilter: true,
			},
			{
				accessorKey: 'battery_chemistry',
				header: 'Battery Chemistry',
				size: 190,
				filterFn: 'includesString',
				enableColumnFilter: true,
			},
			{
				accessorKey: 'product_type',
				header: 'Product Type',
				size: 160,
				filterFn: 'includesString',
				enableColumnFilter: true,
			},
			{
				accessorKey: 'uom',
				header: 'UOM',
				size: 100,
			},
			{
				accessorKey: 'planned_demand_forecast',
				header: 'Planned Demand - Forecast',
				size: 130,
				aggregationFn: 'sum',
				Footer: ({table}) => columnTotalsFn(table, 'planned_demand_forecast')
			},
			{
				accessorKey: 'planned_demand_orders',
				header: 'Planned Demand - Orders',
				size: 130,
				Footer: ({table}) => columnTotalsFn(table, 'planned_demand_orders')
			},
			{
				accessorKey: 'total_demand',
				header: 'Total Demand',
				size: 160,
				Footer: ({table}) => columnTotalsFn(table, 'total_demand')
			},
			{
				accessorKey: 'planned_supply_production_orders',
				header: 'Planned Supply - Production Orders',
				size: 170,
				Footer: ({table}) => columnTotalsFn(table, 'planned_supply_production_orders')
			},
			{
				accessorKey: 'planned_supply_purchase_orders',
				header: 'Planned Supply - Purchase Orders',
				size: 170,
				Footer: ({table}) => columnTotalsFn(table, 'planned_supply_purchase_orders')
			},
			{
				accessorKey: 'planned_supply_projected_used_production_scrap',
				header: 'Planned Supply - Projected Used - Production Scrap',
				size: 180,
				Footer: ({table}) => columnTotalsFn(table, 'planned_supply_projected_used_production_scrap')
			},
			{
				accessorKey: 'planned_supply_projected_used_purchased',
				header: 'Planned Supply - Projected Used - Purchased',
				size: 180,
				Footer: ({table}) => columnTotalsFn(table, 'planned_supply_projected_used_purchased')
			},

			{
				accessorKey: 'actual_on_hand_supply_qty',
				header: 'Actual On-Hand Supply Qty',
				size: 160,
				Footer: ({table}) => columnTotalsFn(table, 'actual_on_hand_supply_qty')
			},
			{
				accessorKey: 'total_supply',
				header: 'Total Supply',
				size: 160,
				Footer: ({table}) => columnTotalsFn(table, 'total_supply')
			},
			{
				accessorKey: 'demand_diff_supply',
				header: 'Demand Greater Than Supply',
				size: 160,
				filterVariant: 'select',
				filterSelectOptions: [{label: 'positive', value: true}, {label: 'negative', value: false}],
				filterFn: (row, id, filterValue) => {
					if (filterValue) return row.getValue(id) >= 0
					else return row.getValue(id) < 0
				},
			}
		],
		[],
	);


	const table = useMaterialReactTable({
		data,
		columns,
		enableColumnResizing: true,
		enableRowSelection: true,
		enablePagination: false,
		enableDensityToggle: false,
		enableHiding: false,
		state: {
			isLoading,
			density: 'compact'
		},
	});

	return (
		<MaterialReactTable table={table}/>
	);
}

export default DSAtNode;