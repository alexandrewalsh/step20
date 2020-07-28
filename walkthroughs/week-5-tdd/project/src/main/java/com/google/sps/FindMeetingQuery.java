// Copyend 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.*;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {

    int start = TimeRange.START_OF_DAY;
    int end = TimeRange.END_OF_DAY;
    long duration = request.getDuration();
    LinkedList<TimeRange> reqTimes = new LinkedList<TimeRange>();
    LinkedList<TimeRange> optTimes = new LinkedList<TimeRange>();

    // assumes elements in events are in order 
    for(Event e : events) {
        // make sure this event contains relevant attendees
        if (Collections.disjoint(e.getAttendees(), request.getAttendees())) {
            continue;
        }

        end = e.getWhen().start();
        // make sure event isn't nested in previous event
        if (e.getWhen().end() < start) {
            continue;
        }

        if (end - start >= duration) {
            TimeRange validRange = TimeRange.fromStartEnd(start, end, false);
            reqTimes.add(validRange);
        }
        start = e.getWhen().end();    
    }

    end = TimeRange.END_OF_DAY;
    if (end - start > duration) {
        TimeRange validRange = TimeRange.fromStartEnd(start, end, true);
            reqTimes.add(validRange);
    }

    // run as above but considering both attendee list and optional attendees
    start = TimeRange.START_OF_DAY;
    end = TimeRange.END_OF_DAY;

    for(Event e : events) {
        // make sure this event contains relevant attendees
        if (Collections.disjoint(e.getAttendees(), request.getAttendees())
                && Collections.disjoint(e.getAttendees(), request.getOptionalAttendees())) {
            continue;
        }

        end = e.getWhen().start();
        // make sure event isn't nested in previous event
        if (e.getWhen().end() < start) {
            continue;
        }

        if (end - start >= duration) {
            TimeRange validRange = TimeRange.fromStartEnd(start, end, false);
            optTimes.add(validRange);
        }
        start = e.getWhen().end();    
    }

    end = TimeRange.END_OF_DAY;
    if (end - start > duration) {
        TimeRange validRange = TimeRange.fromStartEnd(start, end, true);
            optTimes.add(validRange);
    }


    if(/*1+ time slots exists so that both mandatory and optional attendees can attend*/!optTimes.isEmpty()) {
        /*return those timeslots*/
        return optTimes;
    }
    /* return the time slots that fit just the mandatory attendees */
    return reqTimes;
  }
}
