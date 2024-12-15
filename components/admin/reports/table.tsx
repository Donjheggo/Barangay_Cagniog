import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetReports, GetTotalReports } from "@/lib/actions/reports";
import { TablePagination } from "./pagination";
import UpdateButton from "./update-button";
import DeleteButton from "./delete-button";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../../ui/button";

export default async function ReportsTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [totalReports, reports] = await Promise.all([
    GetTotalReports(),
    GetReports(searchQuery, page, items_per_page),
  ]);

  const totalPages = Math.ceil(totalReports / items_per_page);
  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <CardTitle>Reports</CardTitle>
        <CardDescription>Manage reports.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">Report by</TableHead>
              <TableHead className="table-cell">Reported name</TableHead>
              <TableHead className="table-cell">Reason</TableHead>
              <TableHead className="table-cell">Status</TableHead>
              <TableHead className="table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p>{item.user_id.email}</p>
                </TableCell>
                <TableCell className="font-normal">
                  {item.resident_id.name}
                </TableCell>
                <TableCell className="font-normal">{item.reason}</TableCell>
                <TableCell>
                  {item.status === "ON_GOING"
                    ? "On Going"
                    : item.status === "COMPLETED"
                    ? "Completed"
                    : "Rejected"}
                </TableCell>
                <TableCell className="font-normal">
                  {new Date(item.created_at).toDateString()}
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <UpdateButton id={item.id} />
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <DeleteButton id={item.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          <strong>{(page - 1) * items_per_page + 1}</strong>-
          <strong>{Math.min(page * items_per_page, totalReports)}</strong> of{" "}
          <strong>{totalReports}</strong>
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
