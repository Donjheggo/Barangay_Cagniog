import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetResidents, GetTotalResidents } from "@/lib/actions/residents";
import { TablePagination } from "./pagination";

export default async function ResidentsTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [totalResidents, residents] = await Promise.all([
    GetTotalResidents(),
    GetResidents(searchQuery, page, items_per_page),
  ]);

  const totalPages = Math.ceil(totalResidents / items_per_page);
  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <CardTitle>Residents</CardTitle>
        <CardDescription>Manage residents.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">Name</TableHead>
              <TableHead className="table-cell">Birthdate</TableHead>
              <TableHead className="table-cell">Gender</TableHead>
              <TableHead className="table-cell">Purok</TableHead>
              <TableHead className="table-cell">Religion</TableHead>
              <TableHead className="table-cell">Place of birth</TableHead>
              <TableHead className="table-cell">Income</TableHead>
              <TableHead className="table-cell">Years of residency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {residents?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p className="font-semibold text-lg">{item.name}</p>
                </TableCell>
                <TableCell className="font-normal">
                  {new Date(item.birthdate).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-normal">{item.gender}</TableCell>
                <TableCell className="font-normal">
                  {item.purok_id.name}
                </TableCell>
                <TableCell className="font-normal">{item.religion}</TableCell>
                <TableCell className="font-normal">
                  {item.place_of_birth}
                </TableCell>
                <TableCell className="font-normal">{item.income}</TableCell>
                <TableCell className="font-normal">
                  {item.years_of_residency}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>{(page - 1) * items_per_page + 1}</strong>-
          <strong>{Math.min(page * items_per_page, totalResidents)}</strong> of{" "}
          <strong>{totalResidents}</strong> residents
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
