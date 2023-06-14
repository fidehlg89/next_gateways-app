import React from 'react'
import GatewayTableHeader from './GatewayTableHeader'
import GatewayTableItem from './GatewayTableItem'
import { GatewaysTableHeaderData } from '@/src/static/GatewaysTableHeaderData'
import { IGatewayTableProps } from '@/src/types'

const GatewayTable = ({gateways, onGatewayDelete}: IGatewayTableProps) => {
  return (
    <table className="w-full mt-4 bg-white border border-gray-300">
      <GatewayTableHeader header={GatewaysTableHeaderData} />
      <tbody>
        {gateways.map((gateway) => (
          <GatewayTableItem
            key={gateway._id}
            gateway={gateway}
            onDelete={() => onGatewayDelete(gateway._id)}
          />
        ))}
      </tbody>
    </table>
  )
}

export default GatewayTable