import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Settings = () => {
  return (
    <div className="relative hidden flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
          <div className="grid gap-3">
            <Label htmlFor="model">Quality</Label>
            <Select defaultValue="high">
              <SelectTrigger
                id="model"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Select a quality level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <div className="grid gap-0.5">
                      <p>
                        <span className="font-medium text-foreground">
                          High Quality
                        </span>
                      </p>
                      <p className="text-xs" data-description>
                        As sharp as possible.
                      </p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="balanced">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <div className="grid gap-0.5">
                      <p>
                        <span className="font-medium text-foreground">
                          Balanced
                        </span>
                      </p>
                      <p className="text-xs" data-description>
                        Neither fish nor meat.
                      </p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="fast">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <div className="grid gap-0.5">
                      <p>
                        <span className="font-medium text-foreground">
                          Fast
                        </span>
                      </p>
                      <p className="text-xs" data-description>
                        I am speed.
                      </p>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="temperature">Temperature</Label>
            <Input id="temperature" type="number" placeholder="0.4" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="top-p">Top P</Label>
              <Input id="top-p" type="number" placeholder="0.7" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="top-k">Top K</Label>
              <Input id="top-k" type="number" placeholder="0.0" />
            </div>
          </div>
        </fieldset>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Messages</legend>
          <div className="grid gap-3">
            <Label htmlFor="role">Role</Label>
            <Select defaultValue="system">
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="assistant">Assistant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="You are a..."
              className="min-h-[9.5rem]"
            />
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Settings;
