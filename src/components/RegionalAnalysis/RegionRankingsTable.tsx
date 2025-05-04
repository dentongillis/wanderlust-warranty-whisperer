
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

// Mock data for the rankings table
const regionRankings = [
  { rank: 1, region: 'California', country: 'USA', claims: 780, amount: '$234,500', change: '+12%' },
  { rank: 2, region: 'Texas', country: 'USA', claims: 680, amount: '$198,200', change: '+8%' },
  { rank: 3, region: 'Ontario', country: 'Canada', claims: 520, amount: '$142,600', change: '+15%' },
  { rank: 4, region: 'Florida', country: 'USA', claims: 470, amount: '$128,300', change: '-5%' },
  { rank: 5, region: 'Quebec', country: 'Canada', claims: 420, amount: '$115,800', change: '+2%' },
  { rank: 6, region: 'New York', country: 'USA', claims: 380, amount: '$104,500', change: '+4%' },
  { rank: 7, region: 'Ohio', country: 'USA', claims: 360, amount: '$98,400', change: '+1%' },
  { rank: 8, region: 'British Columbia', country: 'Canada', claims: 340, amount: '$93,500', change: '+7%' },
];

export const RegionRankingsTable: React.FC = () => {
  return (
    <Card className="border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col h-full">
      <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-lg font-medium">Top Regions by Claims</CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-auto flex-grow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">Rank</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Country</TableHead>
              <TableHead className="text-right">Claims</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {regionRankings.map((row) => (
              <TableRow key={row.rank}>
                <TableCell className="text-center font-medium">{row.rank}</TableCell>
                <TableCell>{row.region}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell className="text-right">{row.claims}</TableCell>
                <TableCell className="text-right">{row.amount}</TableCell>
                <TableCell className={`text-right ${row.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {row.change}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
